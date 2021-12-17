import React from "react";
import { selectCurrQuestion } from "../../redux/question/question.selectors";
import { selectCurrAnswer } from "../../redux/answer/answer.selectors";

import { connect } from "react-redux";
import { questionTypes } from "../../redux/question/question.types";
import InputOptions from "../../components/inputOptions/inputOptions.component";
import McqAndMsqOptions from "../../components/mcqandmsqOptions/mcqandmsqOptions.component";
import CodeOptions from "../../components/codeOptions/codeOptions.component";

const QuestionPage = ({ currQuestion, currAnswer }) => {
  const { title, question, points, image, questionType } = currQuestion;
  // console.log(currAnswer);
  return (
    <div>
      <h1>{title}</h1>
      {/* {currAnswer ? <div>{currAnswer.userOptions[0].option}</div> : <div />} */}
      <div>{points} points</div>
      {currAnswer && (
        <div>
          you have earned a score of {currAnswer.score} points for this
          question.
        </div>
      )}
      <h3>{question}</h3>
      {image ? <img src={image} alt="suppImage" /> : <div />}
      {questionType === questionTypes.INPUT ? (
        <InputOptions question={currQuestion} answer={currAnswer} />
      ) : questionType === questionTypes.CODE ? (
        <CodeOptions question={currQuestion} answer={currAnswer} />
      ) : (
        <McqAndMsqOptions question={currQuestion} answer={currAnswer} />
      )}
    </div>
  );
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { questionId },
    },
  }
) => ({
  currQuestion: selectCurrQuestion(questionId)(state),
  currAnswer: selectCurrAnswer(questionId)(state),
});

export default connect(mapStateToProps)(QuestionPage);
