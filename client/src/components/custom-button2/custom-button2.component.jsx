import React from "react";

import "./custom-button2.styles.css";

const CustomButton2 = ({ children, ver2, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      ver2 ? "google-sign-in" : ""
    } custom-button2`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton2;
