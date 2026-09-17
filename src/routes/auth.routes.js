const express = require("express");
const {register, login} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
// Quand une requête POST arrive sur /register, exécute register.

router.post("/login", login);

module.exports = router;