const { body } = require('express-validator');

exports.login = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];
