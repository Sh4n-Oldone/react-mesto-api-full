const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const NotFoundError = require('../errors/notFoundError.js');

router.use(
  usersRouter,
  cardsRouter,
  () => {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  },
);

module.exports = router;
