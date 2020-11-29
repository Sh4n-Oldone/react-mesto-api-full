const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getMe); // нечего валидировать, это пустой get-запрос с проверкой авторизации
usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().max(24),
  }),
}), getUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    avatar: Joi.string().regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).required(),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
