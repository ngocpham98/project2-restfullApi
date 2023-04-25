const { verify } = require('jsonwebtoken');
const STATUS_CODE = require('../constants');

const validateToken = (req, res, next) => {
  const { token } = req.body;

  if (!token)
    return res.status(400).json({
      code: 1009,
      message: STATUS_CODE[1009],
    });

  try {
    const validToken = verify(token, process.env.JWT_SECRET_KEY);
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      code: 9998,
      message: STATUS_CODE[9998],
    });
  }
};

const authorize = (req, res, next) => {
  if (!req.user.is_admin || req.user.is_admin === '0') {
    return res.status(400).json({
      code: 1009,
      message: STATUS_CODE[1009],
    });
  }
  next();
};

module.exports = { validateToken, authorize };
