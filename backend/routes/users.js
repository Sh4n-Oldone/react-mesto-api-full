const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getMe);
usersRouter.get('/users/:userId', auth, getUser);
usersRouter.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
