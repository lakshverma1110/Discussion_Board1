const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },     // store usernames who liked
  dislikedBy: { type: [String], default: [] },  // store usernames who disliked
  posts: [
    {
      text: String,
      author: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Discussion", DiscussionSchema);
