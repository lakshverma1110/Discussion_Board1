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
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostList;
