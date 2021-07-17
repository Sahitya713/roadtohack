import React from "react";
import { selectCurrQuestion } from "../../redux/question/question.selectors";
import { connect } from "react-redux";
import { questionTypes } from "../../redux/question/question.types";
import InputOptions from "../../components/inputOptions/inputOptions.component";
import McqAndMsqOptions from "../../components/mcqandmsqOptions/mcqandmsqOptions.component";

const QuestionPage = ({ currQuestion }) => {
  const { title, question, points, image, questionType } = currQuestion;

  return (
    <div>
      <h1>{title}</h1>
      <div>{points}</div>
      <h3>{question}</h3>
      {image ? <img src={image} alt="suppImage" /> : <div />}
      {questionType === questionTypes.INPUT ? (
        <InputOptions question={currQuestion} />
      ) : (
        <McqAndMsqOptions question={currQuestion} />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currQuestion: selectCurrQuestion(ownProps.match.params.questionId)(state),
});
export default connect(mapStateToProps)(QuestionPage);
