import React from "react";
import "./questionDetail.styles.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
import { selectCurrQuestion } from "../../redux/question/question.selectors";
import { downloadInputStart } from "../../redux/question/question.actions";
import { questionTypes } from "../../redux/question/question.types";
import AnswersPage from "../answersPage/answersPage.component";

const QuestionDetailPage = ({ qn, downloadInputStart }) => {
  const { questionType, question, title, points, location, image } = qn;

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div>{points} points</div>
      <div>{questionType}</div>
      <div>{location.name}</div>
      <div>{question}</div>
      {image ? <img src={image} alt="suppImage" /> : <div />}

      {questionType === questionTypes.CODE && (
        <div>
          <h2>Input</h2>
          <span>
            Download the following file to see an example outputs of your
            Application.
          </span>
          <span>Example Outputs: </span>

          {/* <Link to={input} target="_blank" download>
          Download
        </Link> */}
          <div onClick={() => downloadInputStart(qn._id)}>Download</div>
        </div>
      )}

      {questionType === questionTypes.INPUT && (
        <div>
          {qn.sampleInput.map((input, idx) => (
            <div key={idx}>
              <h2>Sample Input {`${idx + 1}`}</h2>
              <div>{input}</div>
              <h3>Output</h3>
              <div>{qn.sampleOutput[idx]}</div>
            </div>
          ))}
          {qn.inputs.map((input, idx) => (
            <div key={idx}>
              <h2>Input {`${idx + 1}`}</h2>
              <div>{input}</div>
              <h3>Correct Answer</h3>
              <div>{qn.correctAnswers[idx]}</div>
            </div>
          ))}
        </div>
      )}

      {(questionType === questionTypes.MCQ ||
        questionType === questionTypes.MSQ) && (
        <div>
          {qn.options.map(({ option, type, correct }, idx) => (
            <div key={idx}>
              <div>
                {type === "image" ? (
                  <img className="option-img" src={option} alt="item" />
                ) : (
                  option
                )}
              </div>
              <div>{correct ? "correct" : "incorrect"}</div>
            </div>
          ))}
        </div>
      )}

      {/* <CustomButton>
        <Link to={`/answers/${qn.slug}/${qn._id}`}>View Answers</Link>
      </CustomButton> */}
      <AnswersPage
        questionId={qn._id}
        points={qn.points}
        question={{
          questionId: qn._id,
          points: qn.points,
          questionType: qn.questionType,
        }}
      />
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
  qn: selectCurrQuestion(questionId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  downloadInputStart: (id) => dispatch(downloadInputStart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);
