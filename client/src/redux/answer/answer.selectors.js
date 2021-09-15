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
