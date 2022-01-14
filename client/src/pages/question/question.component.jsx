import React from "react";
import { selectCurrQuestion } from "../../redux/question/question.selectors";
import { selectCurrAnswer } from "../../redux/answer/answer.selectors";

import { connect } from "react-redux";
import { questionTypes } from "../../redux/question/question.types";
import InputOptions from "../../components/inputOptions/inputOptions.component";
import McqAndMsqOptions from "../../components/mcqandmsqOptions/mcqandmsqOptions.component";
import CodeOptions from "../../components/codeOptions/codeOptions.component";
import Star from "./star.png";

import "./question.styles.css";
const QuestionPage = ({ currQuestion, currAnswer }) => {
  const { title, question, points, image, questionType } = currQuestion;
  const qn_paras = question.split(/\\r\\n|\\n|\\r/);
  console.log(qn_paras);
  // console.log(typeof JSON.stringify(question));
  // console.log(question);
  // console.log(JSON.stringify(question));
  // console.log(typeof "hello jjsye \n jahs");
  // console.log("hello jjsye \n jahs");
  return (
    <div>
      <div className="qnPage-title-container">
        <div>
          <div className="title">{title}</div>
          {currAnswer && (
            <div className="qn-page-score-display">
              <span>you have earned a score of</span>
              <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                {" "}
                {currAnswer.score}{" "}
              </span>
              <span>points for this question.</span>
            </div>
          )}
        </div>

        <div>
          <img src={Star} alt="star" className="points-star" />
          <div className="points-qnPage">
            <div className="points-no">{points}</div>
            <div className="points-points">points</div>
          </div>
        </div>
      </div>

      <div className="questionPage-container">
        {question.split(/\\r\\n|\\n|\\r/).map((item, idx) => {
          return (
            <span key={idx} className="qnPage-question">
              {`${item}`}

              <br />
            </span>
          );
        })}

        {image ? <img className="qn-img" src={image} alt="qnImage" /> : <div />}
        {questionType === questionTypes.INPUT ? (
          <InputOptions question={currQuestion} answer={currAnswer} />
        ) : questionType === questionTypes.CODE ? (
          <CodeOptions question={currQuestion} answer={currAnswer} />
        ) : (
          <McqAndMsqOptions question={currQuestion} answer={currAnswer} />
        )}
      </div>
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
