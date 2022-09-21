const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { validUrl } = require('../utils/constants');

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
