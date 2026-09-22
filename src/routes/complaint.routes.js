const express = require("express");

const router = express.Router();

const {create, getAll, getOne} = require("../controllers/complaint.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, create);
router.get("/",isAuthenticated, getAll);
router.get("/:id",isAuthenticated, getOne);

module.exports = router;