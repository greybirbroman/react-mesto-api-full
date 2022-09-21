require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const corsOptions = {
//   credentials: true,
//   origin: [
//     'http://localhost:3000/',
//     'https://localhost:3000/',
//     'http://localhost:3001/',
//     'https://localhost:3001/',
//     'https://api.greybirb.nomoredomains.sbs/',
//     'http://api.greybirb.nomoredomains.sbs/',
//     'https://greybirb.nomoredomains.sbs/',
//     'http://greybirb.nomoredomains.sbs/',
//     ],
//   methods: 'GET, POST, HEAD, DELETE, PUT, PATCH',
//   preflightContinue: false,
//   allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
//   optionsSuccessStatus: 200
// };
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { SERVER_ERROR } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

app.use(helmet());

// Connection to database
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
})
.then(() => {
  console.log('Successfull connection to MongoDB')
})
.catch(err => {
  console.log('Error connection to MongoDB')
});

app.use(bodyParser.json());
// Для приема веб-страниц внутри POST запроса
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger); // Подключаем логер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger); // Подключаем логер ошибок
app.use(errors()); // Оброботчик ошибок Celebrate

// Централизованная обработка ошибок

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next(err);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
