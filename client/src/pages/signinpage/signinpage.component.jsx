import React from "react";
import { withRouter } from "react-router-dom";
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/signup/signup.component";

import "./signinpage.styles.css";
const SignInPage = ({ history }) => {
  return (
    <div className="signin-page-container">
      <img
        src="https://roadtohack.s3.ap-southeast-1.amazonaws.com/CODE-X.png"
        alt="code-x"
        className="codex-logo"
      />
      <h2 className="title2">Hi there! Login to start your Quest!</h2>

      <SignIn />

      <h2 className="title2">Do not have an account? Register Below!</h2>
      <SignUp />
      {/* <button>Sign Up!</button> */}
    </div>
  );
};

export default withRouter(SignInPage);
