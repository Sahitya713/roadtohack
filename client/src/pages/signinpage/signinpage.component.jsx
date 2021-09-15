import React from "react";
import { withRouter } from "react-router-dom";
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/signup/signup.component";

const SignInPage = ({ history }) => {
  return (
    <div>
      <h1>Welcome to Road To Hack!</h1>
      <div>hackcode</div>
      <SignIn />
      <SignUp />
      {/* <button>Sign Up!</button> */}
    </div>
  );
};

export default withRouter(SignInPage);
