const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({}).select('+password')
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      throw new NotFoundError('Пользователи не найдены');
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId }).select('+password')
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.create({
    email, password, name, about, avatar,
  })
    .then((user) => res.status(200).send({ message: `Пользователь ${user.email} создан` }))
    .catch(next);
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updatingBody = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId, updatingBody, { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('Пользователь не обнаружен');
    }
    return res.status(200).send({ message: `Профиль обновлён ${updatedUser}` });
  } catch (err) {
    return next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId, { avatar }, { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('Пользователь не обнаружен');
    }
    return res.status(200).send({ message: `Аватар обновлён ${updatedUser}` });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('access_token', token, {
        httpOnly: true,
        expires: '7d',
      });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не обнаружен');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};
