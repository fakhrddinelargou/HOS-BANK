const express = require("express");
const {register, login, logout} = require("../controllers/auth.controller");
const {isAutheticated} = require("../middlewares/auth.middleware");
const {registerSchema} = require("../validations/auth.validation");
const {validate} = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
// Quand une requête POST arrive sur /register, exécute register.

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;