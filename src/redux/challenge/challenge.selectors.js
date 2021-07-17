import { createSelector } from "reselect";

const selectChallenge = (state) => state.challenge;

export const selectCurrChallenge = createSelector(
  [selectChallenge],
  (challenge) => challenge.currChallenge
);

export const selectStatus = createSelector(
  [selectChallenge],
  (challenge) => challenge.challengeStatus
);
