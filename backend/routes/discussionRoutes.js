const express = require("express");
const Discussion = require("../models/Discussion");
const router = express.Router();

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new discussion
router.post("/", async (req, res) => {
  const { title, createdBy } = req.body;
  try {
    const discussion = new Discussion({ title, createdBy });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add post
router.post("/:id/posts", async (req, res) => {
  const { text, author } = req.body;
  try {
    const discussion = await Discussion.findById(req.params.id);
    discussion.posts.push({ text, author });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote (like/dislike)
router.post("/:id/vote", async (req, res) => {
  const { username, type } = req.body;
  try {
    const discussion = await Discussion.findById(req.params.id);
    const prevVote = discussion.voters.get(username);

    if (prevVote === type) {
      if (type === "like") discussion.likes--;
      else discussion.dislikes--;
      discussion.voters.delete(username);
    } else {
      if (prevVote === "like") discussion.likes--;
      if (prevVote === "dislike") discussion.dislikes--;
      if (type === "like") discussion.likes++;
      if (type === "dislike") discussion.dislikes++;
      discussion.voters.set(username, type);
    }

    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
