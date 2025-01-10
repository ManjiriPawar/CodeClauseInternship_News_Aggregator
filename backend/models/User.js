const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  readHistory: [{ type: String }],
  bookmarked: [{ type: String }],
  theme: { type: String, enum: ["light", "dark"], default: "light" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
