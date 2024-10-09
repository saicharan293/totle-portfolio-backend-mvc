const Career = require('../models/careerModel'); // Import the Career model

exports.saveCareerApplication = async (name, email, reason) => {
  try {
    await Career.create({
      name,
      email,
      reason,
    });
    console.log('Career application saved to the database.');
  } catch (error) {
    console.error('Repository Error: Failed to save career application to DB:', error.message);
    throw new Error('Repository Error: Database operation failed.');
  }
};
