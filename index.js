const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const contactRoutes = require("./src/routes/contactRoutes");
const careerRoutes = require("./src/routes/careerRoutes");

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: 'https://totle.ltd', // replace with your actual domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/feedback", contactRoutes);
app.use("/career", careerRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
