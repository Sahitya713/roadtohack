import { createSelector } from "reselect";

export const selectQuestion = (state) => state.question;

export const selectQuestions = createSelector(
  [selectQuestion],
  (qn) => qn.questions
);

export const selectCurrQuestion = (questionUrlParam) =>
  createSelector([selectQuestions], (qns) =>
    qns.find((qn) => qn.slug === questionUrlParam)
  );
