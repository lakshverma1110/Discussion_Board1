import React from "react";

function DiscussionList({ discussions, onSelect, selectedIndex }) {
  return (
    <div className="discussion-list">
      <h3>Discussions</h3>
      <ul>
        {discussions.map((d, index) => (
          <li
            key={index}
            className={index === selectedIndex ? "selected" : ""}
            onClick={() => onSelect(index)}
          >
            {d.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscussionList;
