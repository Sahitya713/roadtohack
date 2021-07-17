import React from "react";
import { questionTypes } from "../../redux/question/question.types";
import CustomButton from "../custom-button/custom-button.component";
// import { connect } from "react-redux";
// import { selectCurrQuestion } from "../../redux/question/question.selectors";

class McqAndMsqOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
      errMessage: " ",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedOptions } = this.state;
    if (selectedOptions.length === 0) {
      this.setState({
        errMessage: "Please make your choice before submitting.",
      });
    } else {
      console.log(this.state.selectedOptions);
    }
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

  render() {
    const { selectedOptions, errMessage } = this.state;
    const { options, questionType } = this.props.question;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Current Value is: {selectedOptions}</h1>
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
          <div>{errMessage}</div>
          <CustomButton type="submit">Submit</CustomButton>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => ({
//   currQuestion: selectCurrQuestion(ownProps.match.params.questionId)(state),
// });
export default McqAndMsqOptions;
