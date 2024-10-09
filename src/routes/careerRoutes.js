const express = require("express");
const careerController = require("../controllers/careerController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/apply", uploadMiddleware.single("resume"), careerController.applyForCareer);

module.exports = router;
