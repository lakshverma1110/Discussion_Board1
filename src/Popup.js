import React from "react";

function Popup({ message, type }) {
  if (!message) return null;
  return <div className={`popup ${type}`}>{message}</div>;
}

export default Popup;
