import answerActionTypes from "./answer.types";

const INITIAL_STATE = {
  answers: null,
  errorMessage: undefined,
  groupScores: null,
  isFetching: null,
};

const answerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case answerActionTypes.FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: action.payload,
        isFetching: false,
      };
    case answerActionTypes.FETCH_GROUP_ANSWERS_SUCCESS:
      return {
        ...state,
        groupScores: action.payload,
        isFetching: false,
      };
    case answerActionTypes.FETCH_ANSWERS_FAILURE:
    case answerActionTypes.CREATE_ANSWER_FAILURE:
    case answerActionTypes.FETCH_GROUP_ANSWERS_FAILURE:
    case answerActionTypes.DOWNLOAD_CODE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };

    case answerActionTypes.FETCH_GROUP_ANSWERS_START:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};

export default answerReducer;
