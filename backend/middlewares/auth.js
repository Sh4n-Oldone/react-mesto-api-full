const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secretKey');
  } catch (error) {
    return res.status(401).send({ message: 'Нужна авторизация' });
  }

  req.user = payload;

  next();
};
