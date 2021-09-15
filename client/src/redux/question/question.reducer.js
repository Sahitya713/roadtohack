import questionActionTypes from "./question.types";

const INITIAL_STATE = {
  questions: null,
  isFetching: false,
  errorMessage: undefined,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case questionActionTypes.FETCH_QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case questionActionTypes.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        questions: action.payload,
      };
    case questionActionTypes.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
