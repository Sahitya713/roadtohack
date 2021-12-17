import React from "react";
import ErrMessage from "../errMessage/errMessage.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";
import { downloadInputStart } from "../../redux/question/question.actions";

class CodeOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: null,
      comment: "",
      errMessage: "",
      changed: true,
    };
  }

  componentDidMount() {
    const { question, answer } = this.props;
    if (answer) {
      this.setState({
        comment: answer.comment,
        userCode: answer.userCode,
      });
    } else {
      this.setState({ userAnswers: question.inputs.map((e) => "") });
    }
  }

  handleSubmit = (e) => {
    const { question, currUser, createAnswer } = this.props;
    e.preventDefault();
    var { userCode, changed, comment } = this.state;

    if (userCode === null) {
      this.setState({
        errMessage: "Please upload your code before submitting",
      });
      return;
    }

    if (changed) {
      createAnswer({
        question: question._id,
        user: currUser._id,
        userCode,
        comment,
      });
    } else {
      createAnswer({
        question: question._id,
        user: currUser._id,
        comment,
      });
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleFileChange = (event) => {
    // Update the state
    this.setState({ userCode: event.target.files[0], changed: true });
  };

  render() {
    const { downloadInputStart } = this.props;
    const { comment, errMessage } = this.state;

    return (
      <div>
        <h2>Input</h2>
        <span>
          Download the following file to see an example outputs of your
          Application.
        </span>
        <span>Example Outputs: </span>

        {/* <Link to={input} target="_blank" download>
          Download
        </Link> */}
        <div onClick={() => downloadInputStart(this.props.question._id)}>
          Download
        </div>

        {/* <a href={`/api/v1/question/download/${input}`}>Download</a> */}
        <form onSubmit={this.handleSubmit}>
          <h2>Solution</h2>

          {/* <div>Please upload a Python File with your solution.</div>
          <div>
            Code File:
            <label>
              Upload
              <input
                type="file"
                onChange={this.handleFileChange}
                // accept=".py .txt"
              />
            </label>
          </div> */}

          <div>Please upload a Python File with your solution.</div>
          <div>
            Code File:
            <input
              type="file"
              onChange={this.handleFileChange}
              id="codeFile"
              name="userCode"
              accept=".py"
            />
          </div>
          <br />

          <label htmlFor="comment">Additional Comments: </label>
          <textarea
            name="comment"
            value={comment}
            onChange={this.handleChange}
            rows="5"
            cols="50"
            id="comment"
          />

          <ErrMessage message={errMessage} />
          <CustomButton type="submit"> Submit</CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  createAnswer: (answer) => dispatch(createAnswerStart(answer)),
  downloadInputStart: (id) => dispatch(downloadInputStart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CodeOptions);