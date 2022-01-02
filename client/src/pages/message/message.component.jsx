import React from "react";

import "./message.styles.css";
const Message = ({ message }) => {
  return (
    <div className="message-page">
      <img
        src="https://roadtohack.s3.ap-southeast-1.amazonaws.com/CODE-X.png"
        alt="code-x"
        className="codex-logo"
      />

      <div className="message">{message}</div>
    </div>
  );
};

export default Message;
