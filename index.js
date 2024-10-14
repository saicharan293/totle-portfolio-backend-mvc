const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const contactRoutes = require("./src/routes/contactRoutes");
const careerRoutes = require("./src/routes/careerRoutes");

const app = express();

// Middleware
// app.use(cors());
const allowedOrigins = ['https://www.totle.ltd']; // Replace with your actual frontend domain

// Global CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow request if origin is in allowedOrigins
    } else {
      callback(new Error('Not allowed by CORS')); // Block request if origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow any methods you need
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/feedback", contactRoutes);
app.use("/career", careerRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
