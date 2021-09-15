import challengeActionTypes from "./challenge.types";

export const updateStatus = () => ({
  type: challengeActionTypes.UPDATE_STATUS,
});

export const fetchChallengeStart = (hackCode) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_START,
  payload: {hackCode: hackCode},
});

export const fetchChallengeSuccess = (challengeMap) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_SUCCESS,
  payload: challengeMap,
});

export const fetchChallengeFailure = (errorMessage) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_FAILURE,
  payload: errorMessage,
});
