import React from "react";

export default function DiscussionList({
  discussions,
  onSelect,
  onVote,
  onDelete,
  selectedIndex,
  currentUser,
}) {
  return (
    <div className="discussion-list">
      {discussions.map((discussion, index) => (
        <div
          key={discussion._id}
          className={`discussion-item ${
            selectedIndex === index ? "selected" : ""
          }`}
          onClick={() => onSelect(index)}   // 👈 make whole box clickable
        >
          <h3>{discussion.title}</h3>
          <p>By: {discussion.createdBy}</p>
          <div className="discussion-actions" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onVote(discussion._id, "like")}>
              👍 {discussion.likes || 0}
            </button>
            <button onClick={() => onVote(discussion._id, "dislike")}>
              👎 {discussion.dislikes || 0}
            </button>
            {discussion.createdBy === currentUser && (
              <button
                className="delete-btn"
                onClick={() => onDelete(discussion._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
