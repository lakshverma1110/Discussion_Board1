const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
  posts: [{ text: String, author: String }],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  voters: { type: Map, of: String, default: {} }
});

module.exports = mongoose.model("Discussion", DiscussionSchema);
