import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.css";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleEdit } from "../../redux/group/group.actions";
import CustomButton2 from "../custom-button2/custom-button2.component";
import { Menu } from "@material-ui/icons";

const Header = ({ signOutStart, toggleEdit, match }) => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const route = location.pathname.split("/").pop();
  return (
    <div className="header">
      <Menu
        className="burger"
        onClick={() => {
          setNav(!nav);
          console.log("hello from nav");
        }}
      />
      <div className={nav ? "options options-active" : "options"}>
        <Link
          className={`home-opt ${match.isExact ? "option-selected" : "option"}`}
          to={`${match.url}`}
        >
          HOME
        </Link>
        <Link
          className={route === "group" ? "option-selected" : "option"}
          to={`/group`}
        >
          Group
        </Link>
        <Link
          className={route === "leaderboard" ? "option-selected" : "option"}
          to={`/leaderboard`}
        >
          Leaderboard
        </Link>
        <Link
          className={route === "faq" ? "option-selected" : "option"}
          to={`/faq`}
        >
          FAQ
        </Link>
      </div>
      <div className="buttons">
        {route === "group" ? (
          <CustomButton2
            style={{ backgroundColor: "rgb(40, 175, 40)" }}
            onClick={toggleEdit}
          >
            Edit
          </CustomButton2>
        ) : (
          <div></div>
        )}
        <CustomButton2 onClick={signOutStart}>Sign Out</CustomButton2>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleEdit: () => dispatch(toggleEdit()),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
