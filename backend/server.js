const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const discussionRoutes = require("./routes/discussionRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/discussions", discussionRoutes);
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/discussionApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
