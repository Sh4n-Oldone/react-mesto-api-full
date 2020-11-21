const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');

router.use(
  usersRouter,
  cardsRouter,
  (req, res) => {
    res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
  },
);

module.exports = router;
