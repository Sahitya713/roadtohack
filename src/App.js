import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { updateStatus } from "./redux/challenge/challenge.actions";
import { selectStatus } from "./redux/challenge/challenge.selectors";

import "./App.css";
import { auth } from "./firebase.utils";
import Main from "./pages/main";
import Message from "./pages/message/message.component";
import SignInPage from "./pages/signinpage/signinpage.component";
import { statuses } from "./redux/challenge/challenge.types";
import Spinner from "./components/spinner/spinner.component";
// import Header from "./components/header/header.component";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, updateStatus } = this.props;
    updateStatus();
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { displayName, email, uid } = userAuth;
        setCurrentUser({
          id: uid,
          displayName,
          email,
          hackCode: "123456",
        });
      } else {
        setCurrentUser({});
      }

      // setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // constructor() {
  //   super();
  //   this.state = { currUser: "sahitya", group: "null" };
  // }
  render() {
    const { currentUser, challengeStatus } = this.props;
    return !currentUser ? (
      <Spinner />
    ) : (
      <div className="App">
        <Switch>
          <Route
            path={`/:${currentUser.hackCode}`}
            render={(props) =>
              currentUser ? (
                challengeStatus.status === statuses.O ? (
                  <Main {...props} />
                ) : (
                  <Message message={challengeStatus.message} />
                )
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => {
              console.log(currentUser);
              return currentUser ? <Redirect to="/home" /> : <SignInPage />;
            }}
          />

          {/* <Route exact path="/signin" component={SignInPage} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  challengeStatus: selectStatus,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateStatus: () => dispatch(updateStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
