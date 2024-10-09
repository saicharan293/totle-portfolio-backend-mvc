const transporter = require("../config/emailConfig");
const careerRepository = require("../repositories/careerRepository");

exports.applyForJob = async (name, email, reason, resume) => {
  // Debugging logs to confirm parameters are being received correctly
  console.log('Service - name:', name);
  console.log('Service - email:', email);
  console.log('Service - reason:', reason);
  console.log('Service - resume:', resume);

  if (!resume) {
    throw new Error("No file is uploaded");
  }

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    replyTo: [email, process.env.ADMIN_EMAIL],
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
    const { token: accessToken } = await transporter.OAuth2_client.getAccessToken();
    transporter.options.auth.accessToken = accessToken;
    await transporter.sendMail(mailOptions);
    await careerRepository.saveCareerApplication(name, email, reason);
  } catch (error) {
    console.error("Error submitting application", error);
    throw new Error("Error submitting application.");
  }
};
