const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, mobile, password } = req.body;

  if (!username || !email || !mobile || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 chars, include 1 uppercase & 1 special char"
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const newUser = new User({ username, email, mobile, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(400).json({ message: "Wrong username or password" });
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
