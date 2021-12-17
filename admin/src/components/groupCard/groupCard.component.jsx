import React from "react";

import { Edit, Delete } from "@material-ui/icons";

import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
// import { createStructuredSelector } from "reselect";

import {
  deleteGroupStart,
  updateGroupStart,
} from "../../redux/group/group.actions";

import "./groupCard.styles.css";

class GroupCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: "",
      members: "",
    };
  }
  componentDidMount() {}

  switchToEdit = () => {
    let { name, members } = this.props.group;
    members = members.toString();
    this.setState({
      name,
      members,
      edit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { name, members } = this.state;
    members = members.split(",");
    members.map((m) => m.trim());
    const update = {};
    update["name"] = name;
    update["members"] = members;

    this.props.updateGroupStart({
      groupId: this.props.group._id,
      group: update,
    });

    this.setState({ edit: false });
  };

  render() {
    const { name, members, groupCode, _id } = this.props.group;
    return (
      <div className="groupCard-container">
        {this.state.edit ? (
          <div>
            <Delete
              onClick={() => {
                this.props.deleteGroupStart(_id);
              }}
              style={{ fontSize: "20px", color: "red" }}
            />
            <CustomButton
              onClick={() => {
                this.setState({ edit: false });
              }}
            >
              Cancel
            </CustomButton>
            <form onSubmit={this.handleSubmit}>
              <label>Group Name: </label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />

              <span>
                Enter emails of the members, seperating emails using a comma.
              </span>
              <label>Members: </label>
              <textarea
                name="members"
                value={this.state.members}
                onChange={this.handleChange}
                rows="8"
                cols="50"
              />

              <CustomButton type="submit"> Save </CustomButton>
            </form>
          </div>
        ) : (
          <div>
            <Edit
              onClick={this.switchToEdit}
              style={{ fontSize: "20px", color: "green" }}
            />
            <Delete
              onClick={() => {
                this.props.deleteGroupStart(_id);
              }}
              style={{ fontSize: "20px", color: "red" }}
            />
            <div>{name}</div>
            <div>{groupCode}</div>
            <div>
              {members.map((mem, idx) => (
                <div key={idx}>{mem}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteGroupStart: (groupId) => dispatch(deleteGroupStart(groupId)),
  updateGroupStart: (group) => dispatch(updateGroupStart(group)),
});

export default connect(null, mapDispatchToProps)(GroupCard);
