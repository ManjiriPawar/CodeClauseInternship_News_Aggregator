const express = require("express");
const User = require("../models/User"); // Assuming you have a User model
const { verifyToken } = require("../utils/auth"); // Middleware to verify JWT

const router = express.Router();

// Subscribe to Notifications
router.post("/subscribe-notifications", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { token } = req.body;

    const user = await User.findById(userId);
    if (user) {
      user.notificationTokens.push(token);
      await user.save();
      res.status(200).json({ message: "Subscription successful!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Send Notification
router.post("/send-notification", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body } = req.body;

    const user = await User.findById(userId);
    if (user && user.notificationTokens.length > 0) {
      // Here you can use any notification service to send the notifications
      // For example, using email, SMS, or a custom notification system.
      res.status(200).json({ message: "Notification sent!" });
    } else {
      res
        .status(404)
        .json({ message: "No tokens available for notifications" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// In your Express backend

// Fetch Notifications
router.get("/fetch-notifications", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user && user.notificationTokens.length > 0) {
      // Retrieve notifications from the database or any other source
      const notifications = await Notification.find({ user: userId });
      res.status(200).json({ notifications });
    } else {
      res.status(404).json({ message: "No notifications found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
