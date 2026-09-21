const express = require('express');
const router = express.Router();
const {createRIB , getRibByCompteID} = require('../controllers/rib.controller');



router.post('/api/create' , createRIB);
router.get('/api/:id' , getRibByCompteID);



module.exports =  router