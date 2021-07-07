import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/header/header.component";
import Homepage from "./homepage/homepage.component";
import LeaderBoard from "./leaderboard/leaderboard.component";
import GroupPage from "./group/group.component";

function Main() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/leaderboard" component={LeaderBoard} />
        <Route exact path="/group" component={GroupPage} />
      </Switch>
    </div>
  );
}

export default Main;
