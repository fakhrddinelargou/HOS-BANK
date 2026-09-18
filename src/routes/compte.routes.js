const express = require('express');
const router = express.Router();
const  {getCompteByID, getComptesByCID , getSolde , createAccount ,updateSoldeAccount }= require('../controllers/compte.controller');

router.get('/api/clients/:clientId/comptes' , getComptesByCID);
router.get('/api/comptes/:id' , getCompteByID);
router.post('/api/comptes/:id/solde' , getSolde);
router.patch('/api/comptes/:id/solde' , updateSoldeAccount);
router.post('/api/comptes' , createAccount);


module.exports = router;