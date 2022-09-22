const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_CODE = 400;
const UNAUTORIZED_ERROR = 401;
const FOUND_ERROR_CODE = 404;
const SERVER_ERROR = 500;
const validUrl = (url) => {
  const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Некорректный url');
};

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_CODE,
  UNAUTORIZED_ERROR,
  FOUND_ERROR_CODE,
  SERVER_ERROR,
  validUrl,
};
