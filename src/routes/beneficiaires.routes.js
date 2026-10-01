const express = require('express');
const router = express.Router();
const { createBeneficiaries , getBeneficiaireByID, up } = require('../controllers/beneficiaire.controller');


router.post('/api/create' , createBeneficiaries );
router.get('/api/search/:id' , getBeneficiaireByID );
router.put('/api/update/:id' , up );

// router.get('/home' , (req,res) => {return res.render(beneficiaries)})


module.exports = router;


