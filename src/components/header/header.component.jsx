import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.utils";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

import "./header.styles.css";

const Header = ({ setCurrentUser, history }) => {
  return (
    <div className="header">
      <div className="options">
        <Link className="option" to="/home">
          HOME
        </Link>
        <Link className="option" to="/home/group">
          GROUP
        </Link>
        <Link className="option" to="/home/leaderboard">
          LEADERBOARD
        </Link>
        <div
          className="option"
          onClick={() => {
            auth.signOut().then(() => {
              console.log("smth");
              setCurrentUser(null);
              history.push("");
              console.log("smth else");
            });
          }}
        >
          SIGN OUT
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
