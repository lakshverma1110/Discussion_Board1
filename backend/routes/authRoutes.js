const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Password validation function
function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ message: "Weak password! Must be 8+ chars, 1 uppercase, 1 special char." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, mobile, password: hashedPassword });
    await user.save();

    res.json({ user: { username, email, mobile } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ user: { username: user.username, email: user.email, mobile: user.mobile } });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
