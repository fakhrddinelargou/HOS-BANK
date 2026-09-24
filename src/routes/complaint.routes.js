const express = require("express");

const router = express.Router();

const {validate} = require("../middlewares/validation.middleware");
const {complaintSchema} = require("../validations/complaint.validation")

const {create, getAll, getOne} = require("../controllers/complaint.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, validate(complaintSchema), create);
router.get("/",isAuthenticated, getAll);
router.get("/:id",isAuthenticated, getOne);

module.exports = router;