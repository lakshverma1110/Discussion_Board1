import React from "react";

export default function DiscussionList({ discussions, onSelect, selectedIndex, onVote, currentUser }) {
  return (
    <ul className="discussion-list">
      {discussions.map((d, i) => (
        <li key={d._id} className={i === selectedIndex ? "selected" : ""}>
          <div onClick={() => onSelect(i)}>
            <strong>{d.title}</strong> by {d.createdBy}
            <p>👍 {d.likes || 0} | 👎 {d.dislikes || 0}</p>
          </div>
          <button onClick={() => onVote(i, "like")}>Like</button>
          <button onClick={() => onVote(i, "dislike")}>Dislike</button>
        </li>
      ))}
    </ul>
  );
}
