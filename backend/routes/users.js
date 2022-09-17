const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const validUrl = (url) => {
  const regex = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/g
  if (regex.test(url)) {
    return url
  }
  throw new Error ('Некорректный url')
}

const {
  getUsers,
  updateProfile,
  updateAvatar,
  getProfile,
  getUserById,
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getProfile);

router.get('/users/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(2).min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validUrl),
  }),
}), updateAvatar);

module.exports = router;
