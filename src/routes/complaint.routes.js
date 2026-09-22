const express = require("express");

const router = express.Router();

const {create} = require("../controllers/complaint.controller");

router.post("/create", create);

module.exports = router;