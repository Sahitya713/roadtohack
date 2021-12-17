import UserActionTypes, { RegStatusTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  regStatus: RegStatusTypes.NULL,
  isFetching: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
        regStatus: RegStatusTypes.NULL,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        regStatus: RegStatusTypes.NULL,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        regStatus: RegStatusTypes.SIGN_IN,
      };
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        regStatus: RegStatusTypes.SIGN_OUT,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        regStatus: RegStatusTypes.SIGN_UP,
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.CHECK_USER_SESSION_END:
      return {
        ...state,
        isFetching: false,
      };
    // case UserActionTypes.SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //   };
    default:
      return state;
  }
};

export default userReducer;
