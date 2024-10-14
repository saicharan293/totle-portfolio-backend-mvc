const transporter = require("../config/emailConfig");
const careerRepository = require('../repositories/careerRepository');

exports.applyForJob = async (name, email, reason, resume) => {
  
  // Check if the resume file is present
  if (!resume) {
    throw new Error("No file is uploaded");
  }

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL, 
    replyTo: email,
    subject: "Application for Developer role",
    text: `A new application has been submitted by ${name}.\n\nEmail: ${email}\nReason for applying:\n${reason}`,
    attachments: [
      {
        filename: resume.originalname,
        content: resume.buffer,
      },
    ],
  };

  try {
    // Get OAuth access token for sending email
    const { token: accessToken } = await transporter.OAuth2_client.getAccessToken();
    transporter.options.auth.accessToken = accessToken;

    // Send email with application details and resume attached
    await transporter.sendMail(mailOptions);
    // await careerRepository.saveCareerApplication(name, email, reason);
    
    // Since we're not saving the application, you can return a success message here
    return { success: true, message: "Application sent successfully." };
  } catch (error) {
    console.error("Error submitting application", error);
    throw new Error("Error submitting application.");
  }
};
