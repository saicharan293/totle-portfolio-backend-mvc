const Contact = require('../models/contactModel'); // Import the Contact model

exports.saveContactInfo = async (name, email, message) => {
  try {
    await Contact.create({
      name,
      email,
      message,
    });
    console.log('Contact information saved to the database.');
  } catch (error) {
    console.error('Repository Error: Failed to save contact info to DB:', error);
    throw new Error('Repository Error: Database operation failed.');
  }
};
