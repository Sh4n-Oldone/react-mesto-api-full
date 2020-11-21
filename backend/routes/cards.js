const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, getCard, putLikeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
cardsRouter.delete('/cards/:cardId', auth, removeCard);
cardsRouter.get('/cards/:cardId', auth, getCard);
cardsRouter.put('/cards/:cardId/likes', auth, putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = cardsRouter;
