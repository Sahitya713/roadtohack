const challengeActionTypes = {
  UPDATE_STATUS: "UPDATE_STATUS",
  FETCH_CHALLENGE_START: "FETCH_CHALLENGE_START",
  FETCH_CHALLENGE_SUCCESS: "FETCH_CHALLENGE_SUCCESS",
  FETCH_CHALLENGE_FAILURE: "FETCH_CHALLENGE_FAILURE",
};

export const statuses = {
  W: "waiting",
  O: "ongoing",
  F: "finished",
};
export default challengeActionTypes;
