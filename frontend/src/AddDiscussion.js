import React, { useState } from "react";

export default function AddDiscussion({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-discussion">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Discussion" />
      <button type="submit">Add</button>
    </form>
  );
}
