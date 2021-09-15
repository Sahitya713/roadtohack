import React from "react";
import { Route } from "react-router-dom";

import Homepage from "../homepage/homepage.component";
import LeaderBoard from "../leaderboard/leaderboard.component";
import GroupPage from "../group/group.component";
import Header from "../../components/header/header.component";
import QuestionPage from "../question/question.component";
// import LeaderBoardContainer from "../leaderboard/leaderboard.container";

import "./main.styles.css";
function Main(props) {
  const { match } = props;

  return (
    <div className="main-app">
      <Header />
      <Route exact path={`${match.path}`} component={Homepage} />
      <Route path={`${match.path}/leaderboard`} component={LeaderBoard} />
      <Route path={`${match.path}/group`} component={GroupPage} />
      <Route
        path={`${match.path}/question/:questionId`}
        component={QuestionPage}
      />
    </div>
  );
}

export default Main;
