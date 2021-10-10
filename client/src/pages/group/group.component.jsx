import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./group.styles.css";
// import { Edit, Clear } from "@material-ui/icons";

import { fetchGroupAnswersStart } from "../../redux/answer/answer.actions";
import { updateGroupStart } from "../../redux/group/group.actions";
import {
  selectGroupScores,
  selectIsGroupScoresFetching,
} from "../../redux/answer/answer.selectors";
import Spinner from "../../components/with-spinner/spinner";

import {
  selectCurrGroup,
  selectGroupEdit,
} from "../../redux/group/group.selectors";
import MemberScore from "../../components/memberScore/memberScore.component";
import GroupEditPopUp from "../../components/group-edit/group-edit-popup.component";
// import FormInput from "../../components/form-input/form-input.component";

class GroupPage extends React.Component {
  componentDidMount() {
    const { fetchGroupAnswersStart, currGroup } = this.props;

    fetchGroupAnswersStart(currGroup._id);
  }

  render() {
    const { isFetching, groupScores, currGroup, isEditTriggered } = this.props;
    // const { nameActivated, grpName } = this.state;
    return isFetching === false ? (
      <div className="grp-container">
        <img className="grp-img" src={currGroup.image} alt="grp-img" />
        <br />
        <span className="grp-name">{currGroup.name}</span>
        {isEditTriggered ? <GroupEditPopUp /> : <div></div>}

        <span>see group members challenge progress</span>

        {groupScores.map((member, idx) => (
          <MemberScore member={member} key={idx} />
        ))}
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  groupScores: selectGroupScores,
  isFetching: selectIsGroupScoresFetching,
  currGroup: selectCurrGroup,
  isEditTriggered: selectGroupEdit,
});
const mapDispatchToProps = (dispatch) => ({
  fetchGroupAnswersStart: (group) => dispatch(fetchGroupAnswersStart(group)),
  updateGroupStart: (group) => dispatch(updateGroupStart(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
