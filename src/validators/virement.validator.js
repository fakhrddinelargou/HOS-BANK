const { body } = require('express-validator');

module.exports = [
  body('montant').isFloat({ min: 0.01 }),
  body('ribBeneficiaire').isLength({ min: 23, max: 23 })
];
