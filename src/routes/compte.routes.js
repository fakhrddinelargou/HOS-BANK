const express = require('express');
const router = express.Router();
const  compteController = require('../controllers/compte.controller');

router.get('/api/user/:id' , compteController.getComptesByCID);
router.get('/api/compte/:id' , compteController.getCompteByID);
router.get('/api/solde/:id' , compteController.getSolde);
router.post('/api/create' , compteController.createAccount);


module.exports = router;