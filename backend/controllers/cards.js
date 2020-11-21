const NotFoundError = require('../errors/notFoundError');
const NotAuthorizeError = require('../errors/notAuthorizeError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточки отсутствуют');
      }
      return res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ message: `Карточка ${card} создана` }))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (card) {
        if (card.owner._id === req.user._id) {
          Card.deleteOne(card);
          return res.status(200).send({ message: 'Карточка удалена' });
        }
        throw new NotAuthorizeError('Ошибка авторизации');
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.putLikeCard = async (req, res, next) => {
  try {
    const likingCard = await Card.findByIdAndUpdate(
      req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
    );
    if (!likingCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send({ message: 'Лайк поставлен успешно' });
  } catch (err) {
    return next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const dislikingCard = await Card.findByIdAndUpdate(
      req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
    );
    if (!dislikingCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send({ message: 'Лайк снят успешно' });
  } catch (err) {
    return next(err);
  }
};
