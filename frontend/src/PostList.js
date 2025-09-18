import React, { useState } from "react";

export default function PostList({ posts, onAddPost }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddPost(text);
    setText("");
  };

  return (
    <div className="post-list">
      {posts.map((p, idx) => <p key={idx}><strong>{p.author}:</strong> {p.text}</p>)}
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New Post" />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
