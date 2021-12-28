import React from "react";
// import { Link } from "react-router-dom";
import ErrMessage from "../errMessage/errMessage.component";
import CustomButton from "../custom-button/custom-button.component";
import CustomButton3 from "../custom-button/custom-button.component";
import FormInputTextArea from "../form-input-textarea/form-input-textarea.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";
import { downloadCodeStart } from "../../redux/answer/answer.actions";
import { Check, Close } from "@material-ui/icons";
import "./inputOptions.styles.css";
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

    this.setState({ errMessage: "" });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  handleUserAnswers = (e) => {
    const { value, name } = e.target;
    console.log(name);
    console.log(this.state.userAnswers);
    console.log(this.state.userAnswers.slice(2));
    console.log(name + 1);
    console.log(this.state.userAnswers.slice(name));
    this.setState(({ userAnswers }) => ({
      userAnswers: [
        ...userAnswers.slice(0, name),
        value,
        ...userAnswers.slice(parseInt(name) + 1, userAnswers.length),
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
    const { answer } = this.props;
    const { sampleInput, sampleOutput, inputs } = this.props.question;
    const { userAnswers, errMessage, comment } = this.state;
    console.log(userAnswers);
    return (
      <div className="code-options-container">
        {sampleInput.map((input, idx) => (
          <div key={idx}>
            <div className="sample-title">Sample Input {`${idx + 1}`}</div>
            <div className="sample-box">{input}</div>
            <div className="sample-title">Sample Output {`${idx + 1}`}</div>
            <div className="sample-box">{sampleOutput[idx]}</div>
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
          <h2 className="code-options-titles">Your Solution</h2>

          <div className="code-options-instructions">
            Please type down your answer to each of the inputs below. If the
            expected output is a list/ array, seperate each of the elements in
            the list with a comma (,).
          </div>
          <div className="code-options-instructions">
            {"E.g. [1,2,3] -> 1,2,3"}
          </div>
          <div className="inputs-container">
            {inputs.map((inp, idx) => (
              <div key={idx} className="input-overlay">
                <span className="input-wrap">
                  <span>Input: </span>
                  <span className="input-box">{inp}</span>
                </span>

                <FormInputTextArea
                  label="Your Output:"
                  name={idx}
                  value={userAnswers[idx]}
                  handleChange={this.handleUserAnswers}
                  rows="4"
                  cols="50"
                  // disabled={answer ? true : false}
                  style={{ margin: "0px", width: "100%" }}
                />
                {answer && (
                  <div>
                    {answer.userAnswers[idx].correct ? (
                      <Check
                        className="input-correct-icon"
                        style={{
                          color: "green",
                          fontSize: "30px",
                          position: "relative",
                          top: "-20",
                        }}
                      />
                    ) : (
                      <Close
                        className="input-correct-icon"
                        style={{
                          color: "red",
                          fontSize: "30px",
                          position: "relative",
                          top: "-20",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {answer && (
            <div className="code-options-container">
              <span className="code-options-instructions">
                View your previously uploaded code here.
              </span>
              <div className="download-container">
                <div className="download-label">Uploaded Code: </div>

                <CustomButton3 onClick={() => downloadCodeStart(answer._id)}>
                  Download Code
                </CustomButton3>
              </div>
            </div>
          )}

          <div className="code-options-instructions">
            Please also upload a python file containing the code that helped you
            arrive at your answer.
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
            // disabled={answer ? true : false}
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
  downloadCodeStart: (id) => dispatch(downloadCodeStart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InputOptions);

//https://www.geeksforgeeks.org/file-uploading-in-react-js/
