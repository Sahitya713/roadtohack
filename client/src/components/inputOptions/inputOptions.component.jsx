import React from "react";
// import { Link } from "react-router-dom";
import ErrMessage from "../errMessage/errMessage.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";
import { downloadInputStart } from "../../redux/question/question.actions";
// import { selectCurrQuestion } from "../../redux/question/question.selectors";

class InputOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: "",
      userCode: null,
      errMessage: "",
      correct: null,
    };
  }

  // componentDidMount() {
  //   this.setState({ userAnswer: this.props.answer.userAnswer });
  // }

  handleSubmit = (e) => {
    const { question, currUser, createAnswer } = this.props;
    e.preventDefault();
    const { userAnswer, userCode } = this.state;
    if (userAnswer === null || userCode == null) {
      this.setState({
        errMessage: "Please type in your final answer and your working code.",
      });
      return;
    }

    createAnswer({
      question: question._id,
      user: currUser._id,
      userAnswer,
      userCode,
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };
  handleFileChange = (event) => {
    // Update the state
    this.setState({ userCode: event.target.files[0] });
  };

  render() {
    const { downloadInputStart } = this.props;
    const { sampleInput, sampleOutput, input, _id } = this.props.question;
    return (
      <div>
        {sampleInput.map((input, idx) => (
          <div key={idx}>
            <h2>Sample Input {`${idx + 1}`}</h2>
            <div>{input}</div>
            <h3>Output</h3>
            <div>{sampleOutput[idx]}</div>
          </div>
        ))}
        <h2>Input</h2>
        <span>
          Download the input file below and submit your solution to the given
          input to this page.
        </span>
        <span>Input: </span>

        {/* <Link to={input} target="_blank" download>
          Download
        </Link> */}
        <div onClick={() => downloadInputStart(_id)}>Download</div>

        {/* <a href={`/api/v1/question/download/${input}`}>Download</a> */}
        <form onSubmit={this.handleSubmit}>
          <h2>Solution</h2>
          <label>
            Your Output:
            <input
              type="text"
              name="userAnswer"
              value={this.state.userAnswer}
              onChange={this.handleChange}
            />
          </label>
          <div>
            Please also upload a python file containing the code that helped you
            arrive at your answer.
          </div>
          <label>
            Code File:
            <input
              type="file"
              onChange={this.handleFileChange}
              // accept=".py .txt"
            />
          </label>

          <ErrMessage message={this.state.errMessage} />
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
export default connect(mapStateToProps, mapDispatchToProps)(InputOptions);

//https://www.geeksforgeeks.org/file-uploading-in-react-js/
