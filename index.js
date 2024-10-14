const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const contactRoutes = require("./src/routes/contactRoutes");
const careerRoutes = require("./src/routes/careerRoutes");

const app = express();

// Middleware
// app.use(cors());
// const cors = require('cors');

const allowedOrigins = ['https://www.totle.ltd', 'http://localhost:3000']; // Add both your production and dev domains

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from your allowedOrigins list or if the request is from a tool like Postman (null origin)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST'], // Allow the necessary methods (POST, GET, etc.)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/feedback", contactRoutes);
app.use("/career", careerRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
