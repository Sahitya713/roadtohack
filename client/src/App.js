import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
// import { compose } from "redux";

import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";
import { isUserFetching, selectCurrentUser } from "./redux/user/user.selectors";
import { updateStatus } from "./redux/challenge/challenge.actions";
import { selectStatus } from "./redux/challenge/challenge.selectors";

import "./App.css";
// import Main from "./pages/main/main.component";
import MainPageContainer from "./pages/main/main.container";
import Message from "./pages/message/message.component";
import SignInPage from "./pages/signinpage/signinpage.component";
import { statuses } from "./redux/challenge/challenge.types";
// import WithSpinner from "./components/with-spinner/with-spinner.component";
// import { selectGroup } from "./redux/group/group.selectors";
import Spinner from "./components/with-spinner/spinner";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.props.checkUserSession();
  }

  render() {
    const { currentUser, challengeStatus, isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <div className="App">
        <Switch>
          {/* <Route
            exact
            path="/"
            render={(props) =>
              challengeStatus.status === statuses.O ? (
                currentUser ? (
                  <MainPageContainer {...props} />
                ) : (
                  <SignInPage />
                )
              ) : (
                <Message message={challengeStatus.message} />
              )
            }
          /> */}
          <Route
            exact
            path="/"
            render={(props) =>
              challengeStatus.status === statuses.W ? (
                <Message message={challengeStatus.message} />
              ) : currentUser ? (
                <MainPageContainer {...props} />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="/"
            render={(props) =>
              challengeStatus.status === statuses.W ? (
                <Message message={challengeStatus.message} />
              ) : currentUser ? (
                <MainPageContainer {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          {/* <Route
            path="/"
            render={() => {
              return currentUser ? (
                <Redirect to={`/${currentUser.hackCode}`} />
              ) : (
                <SignInPage />
              );
            }}
          /> */}

          <Route exact path="/signin" component={SignInPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  challengeStatus: selectStatus,
  isLoading: isUserFetching,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  updateStatus: () => dispatch(updateStatus()),
  // fetchChallengeStart: (hackCode) => dispatch(fetchChallengeStart(hackCode)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   WithSpinner
// )(App);

// export default connect(mapStateToProps, mapDispatchToProps)(WithSpinner(App));
