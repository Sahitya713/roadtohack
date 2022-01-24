import React from "react";
import ErrMessage from "../errMessage/errMessage.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectStatus } from "../../redux/challenge/challenge.selectors";
import { statuses } from "../../redux/challenge/challenge.types";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";
import { downloadInputStart } from "../../redux/question/question.actions";
import { downloadCodeStart } from "../../redux/answer/answer.actions";
import FormInputTextArea from "../form-input-textarea/form-input-textarea.component";
import "./codeOptions.styles.css";
import CustomButton3 from "../custom-button3/custom-button3.component";

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

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
    const {
      downloadInputStart,
      downloadCodeStart,
      answer,
      question,
      challengeStatus,
    } = this.props;
    const { comment, errMessage } = this.state;

    return (
      <div className="code-options-container">
        <span className="code-options-instructions">
          Download the following file to see an example outputs of your
          Application.
        </span>
        <div className="download-container">
          <div className="download-label">Example Outputs: </div>

          <CustomButton3 onClick={() => downloadInputStart(question._id)}>
            Download
          </CustomButton3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <h2 className="code-options-titles">Your Solution</h2>

          {answer && (
            <div className="code-options-container">
              <span className="code-options-instructions">
                View your previously uploaded code here.
              </span>
              <div className="download-container">
                <div className="download-label">Uploaded Code: </div>

                <CustomButton3
                  type="button"
                  onClick={() => downloadCodeStart(answer._id)}
                >
                  Download Code
                </CustomButton3>
              </div>
            </div>
          )}

          <div className="code-options-instructions">
            Please upload a Python File with your solution.
          </div>
          <div className="download-container">
            <div className="download-label">Code File: </div>

            <input
              type="file"
              onChange={this.handleFileChange}
              id="codeFile"
              name="userCode"
              accept=".py"
            />
          </div>

          <FormInputTextArea
            label="Additional Comments:"
            name="comment"
            value={comment}
            handleChange={this.handleChange}
            rows="5"
            cols="50"
            // disabled={this.props.answer ? true : false}
          />

          <ErrMessage message={errMessage} />
          <CustomButton
            disabled={challengeStatus === statuses.O ? true : false}
            type="submit"
          >
            {" "}
            Submit
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currUser: selectCurrentUser,
  challengeStatus: selectStatus,
});

const mapDispatchToProps = (dispatch) => ({
  createAnswer: (answer) => dispatch(createAnswerStart(answer)),
  downloadInputStart: (id) => dispatch(downloadInputStart(id)),
  downloadCodeStart: (id) => dispatch(downloadCodeStart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CodeOptions);
