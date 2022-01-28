import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Close } from "@material-ui/icons";

import "./group-edit.styles.css";
import { updateGroupStart, toggleEdit } from "../../redux/group/group.actions";
import {
  selectCurrGroup,
  selectGroupError,
} from "../../redux/group/group.selectors";
import CustomButton from "../custom-button/custom-button.component";
import ErrMessage from "../../components/errMessage/errMessage.component";

import FormInput from "../form-input/form-input.component";
class GroupEditPopUp extends React.Component {
  constructor() {
    super();
    this.state = {
      grpName: "",
      displayImage: null,
      grpImage: null,
    };
  }

  componentDidMount() {
    const { name, image } = this.props.currGroup;
    this.setState({ grpName: name, grpImage: image, displayImage: image });
  }
  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  selectImage = (event) => {
    let image = event.target.files[0];
    let imgUrl = URL.createObjectURL(event.target.files[0]);
    // console.log(x);
    console.log(event.target.files);
    this.setState({ displayImage: imgUrl, grpImage: image });
  };

  handleSubmit = (e) => {
    console.log("hellp");

    e.preventDefault();

    let { grpName, grpImage, displayImage } = this.state;
    const { currGroup, updateGroupStart, toggleEdit } = this.props;
    const update = {};

    if (grpName !== currGroup.name) {
      update["name"] = grpName;
    }
    if (displayImage !== currGroup.image) {
      update["image"] = grpImage;
    }

    updateGroupStart({
      groupId: currGroup._id,
      group: update,
    });
    // toggleEdit();
  };

  render() {
    const { toggleEdit } = this.props;
    const { grpName, displayImage } = this.state;

    return (
      <div className="grp-edit-container">
        <div className="grp-edit-overlay">
          <Close onClick={toggleEdit} className="close-group" />
          <h2 className="title grp-edit-title">Edit your Group Details</h2>
          {this.props.groupError ? (
            <ErrMessage message={this.props.groupError} />
          ) : (
            <div />
          )}
          <form className="grp-edit-form" onSubmit={this.handleSubmit}>
            <img className="grp-img-edit" src={displayImage} alt="grp-img" />
            <br />
            <label className="image-upload">
              <input
                type="file"
                onChange={this.selectImage}
                accept=".jpg, .jpeg .png .pdf"
                className="grp-image-input"
              />
              upload photo
            </label>
            <div className="grp-name-wrap">
              <FormInput
                name="grpName"
                // type="grpName"
                value={grpName}
                handleChange={this.handleChange}
                label="Group Name"
              />
            </div>

            <CustomButton
              style={{ backgroundColor: "rgb(40, 175, 40)" }}
              type="submit"
            >
              save
            </CustomButton>
            {/* <CustomButton onClick={toggleEdit}>close</CustomButton> */}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currGroup: selectCurrGroup,
  groupError: selectGroupError,
});

const mapDispatchToProps = (dispatch) => ({
  updateGroupStart: (group) => dispatch(updateGroupStart(group)),
  toggleEdit: () => dispatch(toggleEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditPopUp);
