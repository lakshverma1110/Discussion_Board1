import React, { useState } from "react";

function AddDiscussion({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, posts: [] });
      setTitle("");
    }
  };

  return (
    <div className="add-discussion">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New discussion title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddDiscussion;
