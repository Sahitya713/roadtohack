import answerActionTypes from "./answer.types";

export const createAnswerStart = (answer) => ({
  type: answerActionTypes.CREATE_ANSWER_START,
  payload: answer,
});

export const createAnswerSuccess = (answer) => ({
  type: answerActionTypes.CREATE_ANSWER_SUCCESS,
  payload: answer,
});

export const createAnswerFailure = (errorMessage) => ({
  type: answerActionTypes.CREATE_ANSWER_FAILURE,
  payload: errorMessage,
});

export const fetchAnswersStart = (group) => ({
  type: answerActionTypes.FETCH_ANSWERS_START,
  payload: { group },
});

export const fetchAnswersSuccess = (answers) => ({
  type: answerActionTypes.FETCH_ANSWERS_SUCCESS,
  payload: answers,
});

export const fetchAnswersFailure = (errorMessage) => ({
  type: answerActionTypes.FETCH_ANSWERS_FAILURE,
  payload: errorMessage,
});

export const fetchGroupAnswersStart = (group) => ({
  type: answerActionTypes.FETCH_GROUP_ANSWERS_START,
  payload: { group },
});

export const fetchGroupAnswersSuccess = (answers) => ({
  type: answerActionTypes.FETCH_GROUP_ANSWERS_SUCCESS,
  payload: answers,
});

export const fetchGroupAnswersFailure = (errorMessage) => ({
  type: answerActionTypes.FETCH_GROUP_ANSWERS_FAILURE,
  payload: errorMessage,
});
