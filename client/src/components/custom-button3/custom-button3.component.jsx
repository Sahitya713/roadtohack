import React from "react";

import "./custom-button3.styles.css";

const CustomButton3 = ({ children, ver2, inverted, ...otherProps }) => (
  <button className="custom-botton3" {...otherProps}>
    {children}
  </button>
);

export default CustomButton3;
