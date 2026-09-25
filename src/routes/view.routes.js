const express = require("express");

const router = express.Router();

router.get('/auth/register', (req,res)=>{
    res.render("auth/register");
});

module.exports = router;