const express = require("express");
const {register} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
// Quand une requête POST arrive sur /register, exécute register.

module.exports = router;