const jwt = require('jsonwebtoken');
const NotAuthorizeError = require('../errors/notAuthorizeError');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizeError('Необходима авторизация');
  }

  try {
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new NotAuthorizeError('Необходима авторизация');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(err);
  }
};
