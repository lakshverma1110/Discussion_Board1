const express = require("express");
const router = express.Router();
const Discussion = require("../models/Discussion");

// Get all discussions
router.get("/", async (req, res) => {
  const discussions = await Discussion.find();
  res.json(discussions);
});

// Create discussion
router.post("/", async (req, res) => {
  const { title, createdBy } = req.body;
  const discussion = new Discussion({
    title,
    createdBy,
    likes: 0,
    dislikes: 0,
    likedBy: [],
    dislikedBy: [],
    posts: [],
  });
  await discussion.save();
  res.json(discussion);
});

// Add post
router.post("/:id/posts", async (req, res) => {
  const { text, author } = req.body;
  const discussion = await Discussion.findById(req.params.id);
  discussion.posts.push({ text, author });
  await discussion.save();
  res.json(discussion);
});

// Delete post
router.delete("/:id/posts/:postId", async (req, res) => {
  const { id, postId } = req.params;
  const discussion = await Discussion.findById(id);
  discussion.posts = discussion.posts.filter((p) => p._id.toString() !== postId);
  await discussion.save();
  res.json(discussion);
});

// Delete discussion
router.delete("/:id", async (req, res) => {
  await Discussion.findByIdAndDelete(req.params.id);
  res.json({ message: "Discussion deleted" });
});

// ✅ Like/Dislike with toggle logic (one vote per user)
router.post("/:id/vote", async (req, res) => {
  const { username, type } = req.body; // type = "like" or "dislike"
  const discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return res.status(404).json({ message: "Discussion not found" });
  }

  // Remove old vote if exists
  if (discussion.likedBy.includes(username)) {
    discussion.likedBy = discussion.likedBy.filter((u) => u !== username);
    discussion.likes--;
  }
  if (discussion.dislikedBy.includes(username)) {
    discussion.dislikedBy = discussion.dislikedBy.filter((u) => u !== username);
    discussion.dislikes--;
  }

  // Apply new vote (only if not the same as before)
  if (type === "like" && !discussion.likedBy.includes(username)) {
    discussion.likedBy.push(username);
    discussion.likes++;
  } else if (type === "dislike" && !discussion.dislikedBy.includes(username)) {
    discussion.dislikedBy.push(username);
    discussion.dislikes++;
  }

  await discussion.save();
  res.json(discussion);
});

module.exports = router;
