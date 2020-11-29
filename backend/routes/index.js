const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;
