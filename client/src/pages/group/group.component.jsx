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
  constructor() {
    super();

    this.state = {
      grpName: null,
      grpImage: null,
      nameActivated: false,
    };
  }
  componentDidMount() {
    const { fetchGroupAnswersStart, currGroup } = this.props;

    fetchGroupAnswersStart(currGroup._id);
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  selectImage = (event) => {
    let image = event.target.files[0];
    this.setState({ grpImage: image });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let { grpName, grpImage } = this.state;
    const { currGroup, updateGroupStart } = this.props;
    const update = {};
    if (grpName) {
      update["name"] = grpName;
    }
    if (grpImage) {
      update["image"] = grpImage;
    }

    updateGroupStart({
      groupId: currGroup._id,
      group: update,
    });
    this.setState({ nameActivated: false });
  };

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
