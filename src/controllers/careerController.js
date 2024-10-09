const careerService = require("../services/careerService");

exports.applyForCareer = async (req, res) => {
  // Extract data from the request body
  const { name, email, reason } = req.body;
  const resume = req.file;
  
  // Check if a file was uploaded
  if (!resume) {
    return res.status(400).json({ message: "No file is uploaded" });
  }

  try {
    // Call the service to apply for the job
    const result = await careerService.applyForJob(name, email, reason, resume);
    
    // Return a success message
    res.status(200).json(result); 
  } catch (error) {
    console.error("Error submitting application", error);
    res.status(500).json({ message: "Error submitting application." });
  }
};
