import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = () => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        HOME
      </Link>
      <Link className="option" to="/shop">
        GROUP
      </Link>
      <Link className="option" to="/leaderboard">
        LEADERBOARD
      </Link>
      <Link className="option" to="/shop">
        SIGN OUT
      </Link>
    </div>
  </div>
);

export default Header;
