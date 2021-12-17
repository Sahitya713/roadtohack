import React from "react";
import { questionTypes } from "../../redux/question/question.types";
// import CustomButton from "../custom-button/custom-button.component";
import ErrMessage from "../errMessage/errMessage.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createAnswerStart } from "../../redux/answer/answer.actions";
import { createStructuredSelector } from "reselect";

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
    const { answer } = this.props;
    if (answer) {
      this.setState({ selectedOptions: answer.userOptions });
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <h1>Current Value is: {selectedOptions}</h1> */}
          {options.map(({ option, type }, idx) => (
            <label key={idx}>
              <input
                type={questionType === questionTypes.MCQ ? "radio" : "checkbox"}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={this.handleChange}
              />

              {type === "image" ? <img src={option} alt="item" /> : option}
            </label>
          ))}

          <label htmlFor="comment">Additional Comments: </label>
          <textarea
            name="comment"
            value={comment}
            onChange={this.handleComment}
            rows="5"
            cols="50"
            id="comment"
          />
          <ErrMessage message={errMessage} />
          <button disabled={answer ? true : false} type="submit">
            Submit
          </button>
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
