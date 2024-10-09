const contactRepository = require('../repositories/contactRepository');
const transporter = require('../config/emailConfig')

exports.sendContactEmail = async (name, email, message ) => {
  // Handle email logic here (e.g., using Nodemailer)
  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    replyTo: [email, process.env.ADMIN_EMAIL],
    subject: "Application for Developer role",
    text: `A new application has been submitted by ${name}.\n\nEmail: ${email}\nReason for applying:\n${message}`,
    
  };

  try {
    const { token: accessToken } = await transporter.OAuth2_client.getAccessToken();
    transporter.options.auth.accessToken = accessToken;
    await transporter.sendMail(mailOptions);
    await contactRepository.saveContactInfo(name, email, message);
  } catch (error) {
    console.error("Error sending email or saving data:", error);
    throw new Error("Error submitting application.");
  }
  
  // Save contact info in the database
};
