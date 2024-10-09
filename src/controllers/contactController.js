// const feedbackService = require("../services/emailService");
const contactService = require('../services/contactService');

exports.sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await contactService.sendContactEmail(name, email, message);
    res.status(200).send("Email sent and data saved.");
  } catch (error) {
    console.error("Error sending email or saving data:", error.message);
    res.status(500).send("Error sending email or saving data.");
  }
};
