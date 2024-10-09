const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.get("/", (req, res) => res.send("hey"));
router.post("/contact", contactController.sendFeedback);

module.exports = router;
