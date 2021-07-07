import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/main";
import SignInPage from "./pages/signinpage/signinpage.component";
import GroupCfm from "./pages/groupcfm/groupcfm.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = { currUser: "sahitya", group: "null" };
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.currUser ? <Main /> : <Redirect to="/signin" />
            }
          />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/group-cfm" component={GroupCfm} />
        </Switch>
      </div>
    );
  }
}

export default App;
