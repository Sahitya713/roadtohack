import React from "react";
import { withRouter } from "react-router-dom";
import SignUp from "../../components/signup/signup.component";

const SignInPage = ({ history }) => {
  return (
    <div>
      <h1>Welcome to Road To Hack!</h1>
      <div>hackcode</div>
      <div>email</div>
      <div>password</div>
      <button onClick={() => history.push("group-cfm")}>Sign In!</button>
      <SignUp />
      {/* <button>Sign Up!</button> */}
    </div>
  );
};

export default withRouter(SignInPage);
