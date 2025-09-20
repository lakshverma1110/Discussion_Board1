import React, { useState } from "react";

export default function PostList({ posts, onAddPost, onDeletePost, currentUser }) {
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
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div className="post-content">
              <div>
                <p>{post.text}</p>
                <p className="post-author">— {post.author}</p>
              </div>
              {post.author === currentUser && (
                <button
                  className="delete-btn"
                  onClick={() => onDeletePost(post._id)}
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <form className="add-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-post-input"
          placeholder="Write a post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-post-btn">
          ➕ Add
        </button>
      </form>
    </div>
  );
}
