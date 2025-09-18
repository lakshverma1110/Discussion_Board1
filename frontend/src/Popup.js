import React from "react";

export default function Popup({ message, type }) {
  if (!message) return null;
  return (
    <div className={`popup ${type || "info"}`}>
      {message}
    </div>
  );
}
