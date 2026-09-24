const express = require("express");
const {register, login, logout} = require("../controllers/auth.controller");
const {isAutheticated} = require("../middlewares/auth.middleware");
const {validate} = require("../middlewares/validation.middleware");
const {registerSchema, loginSchema} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
// Quand une requête POST arrive sur /register, exécute register.

router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

module.exports = router;