import React from "react";

import { selectCurrChallenge } from "../../redux/challenge/challenge.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const Homepage = ({ challenge, match }) => {
  return (
    <div>
      <h1>Hacker's Homepage</h1>
      <span>{challenge.description}</span>
      <div>{challenge.challengeCode}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  challenge: selectCurrChallenge,
});
export default connect(mapStateToProps)(Homepage);
