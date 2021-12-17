import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./signin.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { emailSignInStart } from "../../redux/user/user.actions";
import { selectSignInError } from "../../redux/user/user.selectors";

import ErrMessage from "../errMessage/errMessage.component";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        {/* <h2>I already have an account</h2> */}
        <h3>Login with your email and password</h3>
        {this.props.authError ? (
          <ErrMessage message={this.props.authError} />
        ) : (
          <div />
        )}

        <form onSubmit={this.handleSubmit}>
          {/* <FormInput
            name="hackCode"
            type="hackCode"
            value={this.state.hackCode}
            handleChange={this.handleChange}
            label="Challenge Code"
            required
          /> */}
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />

          <div className="buttons-signin">
            <CustomButton type="submit"> SIGN IN </CustomButton>
            {/* <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              {" "}
              Sign in with Google{" "}
            </CustomButton> */}
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});
const mapStateToProps = createStructuredSelector({
  authError: selectSignInError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
