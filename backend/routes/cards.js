const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, getCard, putLikeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).required(),
  }),
}), createCard);
cardsRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().max(24),
  }),
}), removeCard);
cardsRouter.get('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().max(24),
  }),
}), getCard);
cardsRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().max(24),
  }),
}), putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().max(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
