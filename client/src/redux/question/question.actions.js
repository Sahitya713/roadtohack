import questionActionTypes from "./question.types";

export const fetchQuestionsStart = (hackCode) => ({
  type: questionActionTypes.FETCH_QUESTIONS_START,
  payload: { hackCode: hackCode },
});

export const fetchQuestionsSuccess = (questions) => ({
  type: questionActionTypes.FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = (errorMessage) => ({
  type: questionActionTypes.FETCH_QUESTIONS_FAILURE,
  payload: errorMessage,
});

export const downloadInputStart = (url) => ({
  type: questionActionTypes.DOWNLOAD_INPUT_START,
  payload: { url },
});

export const downloadInputSuccess = () => ({
  type: questionActionTypes.DOWNLOAD_INPUT_SUCCESS,
  // payload: questions,
});

export const downloadInputFailure = (errorMessage) => ({
  type: questionActionTypes.DOWNLOAD_INPUT_FAILURE,
  payload: errorMessage,
});
