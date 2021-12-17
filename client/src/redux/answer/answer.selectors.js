import { createSelector } from "reselect";

export const selectAnswer = (state) => state.answer;

const selectAnswers = createSelector(
  [selectAnswer],
  (answer) => answer.answers
);

export const selectCurrAnswer = (questionId) =>
  createSelector([selectAnswers], (answers) => {
    console.log(questionId);
    return answers.find((ans) => ans.question.slug === questionId);
  });

export const selectGroupScores = createSelector(
  [selectAnswer],
  (answer) => answer.groupScores
);

export const selectIsGroupScoresFetching = createSelector(
  [selectAnswer],
  (ans) => ans.isFetching
);

// const selectGroupAnswers = createSelector(
//   [selectAnswer],
//   (answers) => {

//   }
// )

export const selectAnswerStatuses = createSelector([selectAnswer], (answer) => {
  const res = {};
  answer.answers.forEach((ans) => {
    let status = "maybe";
    const { question, isAnswerCorrect, score } = ans;
    status =
      question.questionType === "code"
        ? "partial"
        : isAnswerCorrect
        ? "good"
        : score > 0
        ? "partial"
        : "bad";
    res[question._id] = status;
  });
  return res;
});

// qn.questionType === "code"
//             ? { backgroundColor: "orange" }
//             : ans.isAnswerCorrect
//             ? { backgroundColor: "green" }
//             : ans.score > 0
//             ? { backgroundColor: "orange" }
//             : { backgroundColor: "red" }
