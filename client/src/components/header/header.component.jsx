import React from "react";
import { Link } from "react-router-dom";
import { withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.css";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleEdit } from "../../redux/group/group.actions";
import CustomButton from "../custom-button/custom-button.component";

const Header = ({ signOutStart, toggleEdit, match }) => {
  const location = useLocation();
  const route = location.pathname.split("/").pop();
  return (
    <div className="header">
      <div className="options">
        <Link
          className={`home-opt ${match.isExact ? "option-selected" : "option"}`}
          to={`${match.url}`}
        >
          HOME
        </Link>
        <Link
          className={route === "group" ? "option-selected" : "option"}
          to={`${match.url}/group`}
        >
          Group
        </Link>
        <Link
          className={route === "leaderboard" ? "option-selected" : "option"}
          to={`${match.url}/leaderboard`}
        >
          Leaderboard
        </Link>
      </div>
      <div className="buttons">
        {route === "group" ? (
          <CustomButton
            style={{ backgroundColor: "rgb(40, 175, 40)" }}
            onClick={toggleEdit}
          >
            Edit
          </CustomButton>
        ) : (
          <div></div>
        )}
        <CustomButton onClick={signOutStart}>Sign Out</CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleEdit: () => dispatch(toggleEdit()),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
