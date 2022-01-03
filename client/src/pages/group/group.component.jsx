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

    var elements = [];

    for (var i = 0; i < 10 - groupAnswers.length; i++) {
      elements.push(<div className="grey_circles"></div>);
    }

    return isFetching === false ? (
      <div className="template">
        {isEditTriggered ? <GroupEditPopUp /> : <div></div>}
        <div className="left">
          <div className="layout">
            <div className="total_score">TOTAL SCORE</div>
            <div className="points">{totalScore} Points</div>
            <img className="grp_img" src={currGroup.image} alt="grp-img" />
            <div className="grp_name">{currGroup.name}</div>
            {currGroup.members.map((mem) => (
              <div className="grp_members">{mem}</div>
            ))}
            {/* <div className="grp_members">{currGroup.members[0]}</div>
            <div className="grp_members">{currGroup.members[1]}</div>
            <div className="grp_members">{currGroup.members[1]}</div>
            <div className="grp_members">{currGroup.members[1]}</div>
            <div className="grp_members">{currGroup.members[2]}</div>
            <div className="grp_members">{currGroup.members[3]}</div> */}

            <div className="total_qn_count">
              {" "}
              Questions Answered: {groupAnswers.length} /10
            </div>
          </div>
        </div>

        <div className="right">
          <div className="timeline">
            {groupAnswers.map(({ user, score, question }, idx) => {
              if (idx % 2 === 0) {
                return (
                  <div className="left_container" key={idx}>
                    <div className="left_details">
                      <div className="qn_title">{question.title}</div>
                      <div className="info">
                        Score: {score}/{question.points} <br></br>
                        Member: {user}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="right_container" key={idx}>
                    <div className="right_details">
                      <div className="qn_title">{question.title}</div>
                      <div className="info">
                        Score: {score}/{question.points} <br></br>
                        Member: {user}
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {elements}
          </div>

          {/* {groupAnswers.map((answer, idx) => (
        <div key={idx}>
          <div>{answer.question.title}<div>
        </div>
      ))} */}
        </div>
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
