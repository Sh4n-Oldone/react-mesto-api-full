const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
};
