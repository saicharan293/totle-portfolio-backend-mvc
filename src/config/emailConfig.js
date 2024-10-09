const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

require('dotenv').config()
const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
OAuth2_client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.ADMIN_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: null,
  },
});
transporter.OAuth2_client = OAuth2_client;
module.exports = transporter;
