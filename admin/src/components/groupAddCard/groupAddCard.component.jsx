import React from "react";

import "./groupAddCard.styles.css";
import { connect } from "react-redux";
import { createGroupStart } from "../../redux/group/group.actions";
import CustomButton from "../../components/custom-button/custom-button.component";

class GroupAddCard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      members: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, members } = this.state;
    members = members.split(",");
    members.map((m) => m.trim());
    console.log(members);

    if (name === "" || members.length === 0) {
      alert("make sure to fill up both the name and members");
      return;
    }

    this.props.createGroupStart({ name, members });
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    return (
      <div>
        <div onClick={onClose}>x</div>
        <form onSubmit={this.handleSubmit}>
          <label>Group Name: </label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label>Members: </label>
          <textarea
            name="members"
            value={this.state.members}
            onChange={this.handleChange}
            rows="8"
            cols="50"
          />

          <CustomButton type="submit"> Create </CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createGroupStart: (group) => dispatch(createGroupStart(group)),
});

export default connect(null, mapDispatchToProps)(GroupAddCard);
