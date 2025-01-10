const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../utils/auth");

const router = express.Router();

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

// Fetch News Articles by Category
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.status(200).json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

module.exports = router;
