import React from "react";
import { questionTypes } from "../../redux/question/question.types";
// import CustomButton from "../custom-button/custom-button.component";
import ErrMessage from "../errMessage/errMessage.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";
import FormInputTextArea from "../form-input-textarea/form-input-textarea.component";
import { Check, Close } from "@material-ui/icons";

import "./mcqandmsqOptions.styles.css";
import CustomButton from "../custom-button/custom-button.component";
class McqAndMsqOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
      errMessage: "",
      comment: "",
    };
  }
  componentDidMount() {
    if (this.props.answer) {
      const { userOptions, comment } = this.props.answer;
      const options_all = userOptions.filter((item) => item.userAnswer);
      const options = options_all.map((item) => item.option);
      this.setState({ selectedOptions: options, comment });
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { selectedOptions, comment } = this.state;

    if (selectedOptions.length === 0) {
      this.setState({
        errMessage: "Please make your choice before submitting.",
      });
      return;
    }

    const { question, currUser, createAnswer } = this.props;
    await createAnswer({
      question: question._id,
      user: currUser._id,
      selectedOptions,
      comment,
    });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // this.setState({})
  };
  handleChange = (event) => {
    const { target } = event;
    const { value, type, checked } = target;

    if (type === "radio") {
      this.setState({ selectedOptions: [value] });
    } else if (type === "checkbox") {
      if (checked) {
        this.setState((prevState) => ({
          selectedOptions: [...prevState.selectedOptions, value],
        }));
      } else {
        this.setState((prevState) => ({
          selectedOptions: prevState.selectedOptions.filter((e) => e !== value),
        }));
      }
    }
  };

  handleComment = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { selectedOptions, errMessage, comment } = this.state;
    const { answer, question } = this.props;
    const { options, questionType } = question;
    console.log(answer);
    console.log(selectedOptions);
    return (
      <div className="mcq-details-container">
        <div className="mcq-remark">
          *** Please note that you can only submit your answers for multiple
          choice questions once.
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* <h1>Current Value is: {selectedOptions}</h1> */}
          <div className="options-container">
            {options.map(({ option, type }, idx) => (
              <div key={idx} className="option-overlay">
                <input
                  type={
                    questionType === questionTypes.MCQ ? "radio" : "checkbox"
                  }
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={this.handleChange}
                  disabled={this.props.answer ? true : false}
                  // className={
                  //   questionType === questionTypes.MCQ
                  //     ? "option-radio"
                  //     : "option-checkbox"
                  // }
                  className="option-checkbox"
                />
                {/* {answer.userOptions[idx].actual !==
                  answer.userOptions[idx].userAnswer && (
                  <Close style={{ color: "red" }} />
                )} */}
                {answer &&
                  ((answer.userOptions[idx].actual &&
                    answer.userOptions[idx].actual ===
                      answer.userOptions[idx].userAnswer) ||
                  answer.userOptions[idx].actual ? (
                    <Check className="mcq-icons" style={{ color: "green" }} />
                  ) : answer.userOptions[idx].actual !==
                    answer.userOptions[idx].userAnswer ? (
                    <Close className="mcq-icons" style={{ color: "red" }} />
                  ) : (
                    <Check className="mcq-icons" style={{ color: "white" }} />
                  ))}

                {type === "image" ? (
                  <img className="option-img" src={option} alt="item" />
                ) : (
                  <span className="option-text">{option}</span>
                )}
              </div>
            ))}
          </div>

          <FormInputTextArea
            label="Additional Comments:"
            name="comment"
            value={comment}
            handleChange={this.handleComment}
            rows="5"
            cols="50"
            disabled={this.props.answer ? true : false}
          />

          <ErrMessage message={errMessage} />

          <CustomButton disabled={answer ? true : false} type="submit">
            Submit
          </CustomButton>
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
});

// const mapStateToProps = (state, ownProps) => ({
//   currQuestion: selectCurrQuestion(ownProps.match.params.questionId)(state),
// });
export default connect(mapStateToProps, mapDispatchToProps)(McqAndMsqOptions);
