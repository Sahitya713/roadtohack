import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../components/custom-button/custom-button.component";
import { selectCurrChallenge } from "../../redux/challenge/challenge.selectors";
import { editChallengeStart } from "../../redux/challenge/challenge.actions";
// import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./challengePage.styles.css";

const convertTime = (mongoDate) => {
  var time = new Date(mongoDate);

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  var date = time.getDate();
  var hour = time.getHours();
  var min = time.getMinutes();
  if (min === 0) {
    min = "00";
  }
  if (hour === 0) {
    hour = "00";
  }
  var time_converted =
    date + " " + month + " " + year + ", " + hour + ":" + min; // final date with time, you can use this according your requirement
  return time_converted;
};

class ChallengePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      title: "",
      description: "",
      startTime: null,
      endTime: null,
    };
  }

  componentDidMount() {}

  switchToEdit = () => {
    var { title, description, startTime, endTime } = this.props.challenge;
    // startTime = new Date(startTime);
    // startTime = startTime.getTime();
    endTime = endTime.split(":");
    endTime = endTime[0] + ":" + endTime[1];
    startTime = startTime.split(":");
    startTime = startTime[0] + ":" + startTime[1];

    this.setState({
      title,
      description,
      startTime,
      endTime,
      edit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, startTime, endTime } = this.state;

    endTime = endTime.split(":");
    endTime = endTime[0] + ":" + endTime[1];
    startTime = startTime.split(":");
    startTime = startTime[0] + ":" + startTime[1];

    const { challenge, editChallengeStart } = this.props;

    const update = {};

    if (title !== challenge.title) {
      update["title"] = title;
    }
    if (description !== challenge.description) {
      update["description"] = description;
    }
    update["startTime"] = startTime;
    update["endTime"] = endTime;
    // if (startTime !== challenge.startTime) {
    //   update["startTime"] = startTime;
    // }
    // if (endTime !== challenge.endTime) {
    //   update["endTime"] = endTime;
    // }

    editChallengeStart({
      challengeId: challenge._id,
      challenge: update,
    });

    this.setState({ edit: false });
  };

  render() {
    const { title, description, startTime, endTime } = this.props.challenge;
    console.log(typeof startTime);
    var start_time = convertTime(startTime);
    var end_time = convertTime(endTime);
    const { edit } = this.state;
    console.log(this.state);

    return (
      <div>
        <div className="title">Challenge Details</div>
        {edit ? (
          <div>
            <CustomButton onClick={() => this.setState({ edit: false })}>
              Cancel
            </CustomButton>
          </div>
        ) : (
          <CustomButton onClick={this.switchToEdit}>Edit</CustomButton>
        )}
        {edit ? (
          <form onSubmit={this.handleSubmit}>
            <label>Challenge Title: </label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            <label>Challenge Description: </label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              rows="8"
              cols="50"
            />

            <label>Choose a time for your appointment:</label>

            <input
              type="datetime-local"
              id="meeting-time"
              name="startTime"
              value={this.state.startTime}
              min="2020-06-07T00:00"
              max="2022-06-14T00:00"
              onChange={this.handleChange}
            />

            <input
              type="datetime-local"
              name="endTime"
              value={this.state.endTime}
              min="2021-01-31T00:00"
              max="2022-12-31T00:00"
              onChange={this.handleChange}
            />
            <div className="challenge-edit-button">
              <CustomButton type="submit"> Save </CustomButton>
            </div>
          </form>
        ) : (
          <div>
            <div>Challenge Title: {title}</div>
            <div>Challenge Description: {description}</div>
            <div>Start Time: {start_time}</div>
            <div>End Time: {end_time}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editChallengeStart: (challenge) => dispatch(editChallengeStart(challenge)),
});

const mapStateToProps = createStructuredSelector({
  challenge: selectCurrChallenge,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
