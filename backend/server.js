const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const firebaseAdmin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors"); // Import the CORS package

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

// Enable CORS for all origins (or specify allowed origins as needed)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Firebase Admin Initialization
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/user", userRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
