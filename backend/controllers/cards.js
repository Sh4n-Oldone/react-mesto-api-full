const NotFoundError = require('../errors/notFoundError');
const NotAuthorizeError = require('../errors/notAuthorizeError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createAt: -1 })
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
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  const chosenCard = req.params.cardId;
  Card.findOne({ _id: chosenCard })
    .then((card) => {
      if (card) {
        // eslint-disable-next-line eqeqeq
        if (card.owner._id == req.user._id) {
          return Card.deleteOne({ _id: chosenCard }).then(() => res.status(200).send({ message: 'Карточка удалена' }));
          // Card.deleteOne(card);
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
    return res.status(200).send(likingCard);
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
    return res.status(200).send(dislikingCard);
  } catch (err) {
    return next(err);
  }
};
