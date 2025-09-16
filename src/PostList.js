import React, { useState } from "react";

function PostList({ posts, onAddPost }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddPost(text);
      setText("");
    }
  };

  return (
    <div className="post-list">
      <h3>Posts</h3>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to comment!</p>
      ) : (
        <ul>
          {posts.map((p, i) => (
            <li key={i} className="post-item">
              <strong>{p.author}:</strong> {p.text}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="post-input"
        />
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostList;
