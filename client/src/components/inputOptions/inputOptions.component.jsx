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
      userAnswers: ["", "", ""],
      userCode: null,
      errMessage: "",
      correct: null,
      changed: false,
      comment: "",
    };
  }

  componentDidMount() {
    const { question, answer } = this.props;
    if (answer) {
      const answers = answer.userAnswers.map((el) => el.userAnswer);
      this.setState({
        userAnswers: answers,
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
    var { userAnswers, userCode, changed, comment } = this.state;
    console.log(userAnswers);
    userAnswers = userAnswers.filter((el) => el !== "");

    if (
      userAnswers === null ||
      userCode == null ||
      userAnswers.length !== question.correctAnswers.length
    ) {
      this.setState({
        errMessage:
          "Please type in your answers for all the questions and upload your working code before submitting.",
      });
      return;
    }

    if (changed) {
      createAnswer({
        question: question._id,
        user: currUser._id,
        userAnswers,
        userCode,
        comment,
      });
    } else {
      createAnswer({
        question: question._id,
        user: currUser._id,
        userAnswers,
        comment,
      });
    }
  };

  handleUserAnswers = (e) => {
    const { value, name } = e.target;
    this.setState(({ userAnswers }) => ({
      userAnswers: [
        ...userAnswers.slice(0, name),
        value,
        ...userAnswers.slice(name + 1),
      ],
    }));
    // this.setState({ [name]: value });
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
    console.log(this.props);
    // const { downloadInputStart } = this.props;
    const { sampleInput, sampleOutput, inputs } = this.props.question;
    const { userAnswers, errMessage, comment } = this.state;

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
        {/* <h2>Input</h2>
        <span>
          Download the input file below and submit your solution to the given
          input to this page.
        </span>
        <span>Input: </span>

        {/* <Link to={input} target="_blank" download>
          Download
        </Link> */}
        {/* <div onClick={() => downloadInputStart(_id)}>Download</div> */}
        {/* <a href={`/api/v1/question/download/${input}`}>Download</a> */}
        <form onSubmit={this.handleSubmit}>
          <h2>Solution</h2>
          {inputs.map((inp, idx) => (
            <div key={idx}>
              <div>Input: {inp}</div>
              <label>
                Your Output:
                <input
                  type="text"
                  name={idx}
                  value={userAnswers[idx]}
                  onChange={this.handleUserAnswers}
                />
              </label>
              {this.props.answer && (
                <div>
                  {this.props.answer.userAnswers[idx].correct
                    ? "Correct"
                    : "Incorrect"}
                </div>
              )}
            </div>
          ))}

          <div>
            Please also upload a python file containing the code that helped you
            arrive at your answer.
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(InputOptions);

//https://www.geeksforgeeks.org/file-uploading-in-react-js/
