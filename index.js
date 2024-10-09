const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const contactRoutes = require("./src/routes/contactRoutes");
const careerRoutes = require("./src/routes/careerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/feedback", contactRoutes);
app.use("/career", careerRoutes);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
