import React from "react";

import "./errMessage.styles.css";

const ErrMessage = ({ message }) => (
  <div className="errMessage">{message && <div>***{message}***</div>}</div>
);

export default ErrMessage;
