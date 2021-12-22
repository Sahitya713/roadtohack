import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./group.styles.css";
// import { Edit, Clear } from "@material-ui/icons";

import { fetchGroupAnswersStart } from "../../redux/answer/answer.actions";
import { updateGroupStart } from "../../redux/group/group.actions";

import {
  selectAnswers,
  selectIsGroupScoresFetching,
  selectTotalScore,
} from "../../redux/answer/answer.selectors";
import Spinner from "../../components/with-spinner/spinner";

import {
  selectCurrGroup,
  selectGroupEdit,
} from "../../redux/group/group.selectors";
import MemberScore from "../../components/memberScore/memberScore.component";
import GroupEditPopUp from "../../components/group-edit/group-edit-popup.component";
import { answerSagas } from "../../redux/answer/answer.sagas";
// import FormInput from "../../components/form-input/form-input.component";

class GroupPage extends React.Component {
  componentDidMount() {
    const { fetchGroupAnswersStart, currGroup } = this.props;

    fetchGroupAnswersStart(currGroup._id);
  }

  render() {
    const { isFetching, groupAnswers, currGroup, totalScore, isEditTriggered } =
      this.props;
    console.log(totalScore);
    console.log("group Scores");
    console.log(groupAnswers);
    // const { nameActivated, grpName } = this.state;
    return isFetching === false ? (
      <div className="grp-container">
        <div>Total Score: {totalScore}</div>
        <div>Questions Answered: {groupAnswers.length} /10</div>
        <img className="grp-img" src={currGroup.image} alt="grp-img" />
        <br />
        <span className="grp-name">{currGroup.name}</span>
        {isEditTriggered ? <GroupEditPopUp /> : <div></div>}

        {groupAnswers.map(({ user, score, question }, idx) => (
          // <MemberScore member={member} key={idx} />
          <div key={idx}>
            <div>{question.title}</div>
            <div>
              {score} / {question.points}{" "}
            </div>
            <div>answered by: {user}</div>
            <br />
          </div>
        ))}
        {/* {groupAnswers.map((answer, idx) => (
          <div key={idx}>
            <div>{answer.question.title}<div>
          </div>
        ))} */}
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  groupAnswers: selectAnswers,
  isFetching: selectIsGroupScoresFetching,
  currGroup: selectCurrGroup,
  totalScore: selectTotalScore,
  isEditTriggered: selectGroupEdit,
});
const mapDispatchToProps = (dispatch) => ({
  fetchGroupAnswersStart: (group) => dispatch(fetchGroupAnswersStart(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
