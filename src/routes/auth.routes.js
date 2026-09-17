const express = require("express");
const {register, login, logout} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
// Quand une requête POST arrive sur /register, exécute register.

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;