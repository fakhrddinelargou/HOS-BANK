const { body } = require('express-validator');

module.exports = [
  body('nom').trim().notEmpty().isLength({ max: 100 }),
  body('rib').isLength({ min: 23, max: 23 })
];
