import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ErrMessage from "../errMessage/errMessage.component";

import "./signup.styles.css";
import { signUpStart } from "../../redux/user/user.actions";
import { selectSignUpError } from "../../redux/user/user.selectors";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      hackCode: "1234567",
      group: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword, group, hackCode } =
      this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords don't match!" });
      // alert("passwords don't match");
      return;
    }
    this.setState({ error: "" });

    console.log(hackCode);

    signUpStart({ displayName, group, hackCode, email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, group, email, password, confirmPassword, error } =
      this.state;
    const { authError } = this.props;

    return (
      <div className="sign-in">
        {/* <h2 className="title">I do not have a account</h2> */}
        <h3>Sign up with your email and password</h3>
        {error ? (
          <ErrMessage message={error} />
        ) : authError ? (
          <ErrMessage message={authError} />
        ) : (
          <div />
          // <br></br>
        )}

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          {/* <FormInput
            type="text"
            name="hackCode"
            value={hackCode}
            onChange={this.handleChange}
            label="Challenge Code"
            required
          /> */}
          <FormInput
            type="text"
            name="group"
            value={group}
            onChange={this.handleChange}
            label="Group Code"
            required
          />
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

const mapStateToProps = createStructuredSelector({
  authError: selectSignUpError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
