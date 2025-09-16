import React from "react";

function DiscussionList({ discussions, onSelect, onDelete, onVote, selectedIndex, currentUser }) {
  return (
    <div className="discussion-list">
      <h3>Discussions</h3>
      <ul>
        {discussions.map((d, index) => {
          const userVote = d.voters[currentUser] || null;
          return (
            <li
              key={index}
              className={index === selectedIndex ? "selected" : ""}
            >
              <div onClick={() => onSelect(index)} style={{ cursor: "pointer" }}>
                <strong>{d.title}</strong>
                <p style={{ fontSize: "12px", margin: "4px 0", color: "#555" }}>
                  Created by: {d.createdBy}
                </p>
                <p style={{ fontSize: "12px", margin: "2px 0", color: "#0073e6" }}>
                  👍 Likes: {d.likes} | 👎 Dislikes: {d.dislikes}
                </p>
              </div>

              <div className="discussion-actions">
                <button className="delete-btn" onClick={() => onDelete(index)}>
                  Delete
                </button>
                <div className="vote-section">
                  <label>
                    <input
                      type="radio"
                      name={`vote-${index}`}
                      checked={userVote === "like"}
                      onChange={() => onVote(index, "like")}
                    />
                    👍
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`vote-${index}`}
                      checked={userVote === "dislike"}
                      onChange={() => onVote(index, "dislike")}
                    />
                    👎
                  </label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DiscussionList;
