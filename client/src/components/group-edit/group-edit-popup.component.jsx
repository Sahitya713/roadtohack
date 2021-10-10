import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./group-edit.styles.css";
import { updateGroupStart, toggleEdit } from "../../redux/group/group.actions";
import { selectCurrGroup } from "../../redux/group/group.selectors";
import CustomButton from "../custom-button/custom-button.component";

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
    toggleEdit();
  };

  render() {
    const { toggleEdit } = this.props;
    const { grpName, displayImage } = this.state;

    return (
      <div className="grp-edit-overlay">
        <form onSubmit={this.handleSubmit}>
          <img className="grp-img" src={displayImage} alt="grp-img" />
          <br />
          <label className="image-upload">
            <input
              type="file"
              onChange={this.selectImage}
              accept=".jpg, .jpeg .png .pdf"
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
          <CustomButton onClick={toggleEdit}>close</CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currGroup: selectCurrGroup,
});

const mapDispatchToProps = (dispatch) => ({
  updateGroupStart: (group) => dispatch(updateGroupStart(group)),
  toggleEdit: () => dispatch(toggleEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditPopUp);
