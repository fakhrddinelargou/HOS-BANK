const express = require('express');
const router = express.Router();
const { createBeneficiaries } = require('../controllers/beneficiaire.controller');



router.post('/api/create' , createBeneficiaries );




module.exports = router;


