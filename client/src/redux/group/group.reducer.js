import groupActionTypes from "./group.types";

const INITIAL_STATE = {
  currGroup: null,
  isFetching: false,
  errorMessage: undefined,
  isEditTriggered: false,
};

const groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case groupActionTypes.FETCH_GROUP_START:
      return {
        ...state,
        isFetching: true,
      };
    case groupActionTypes.FETCH_GROUP_SUCCESS:
    case groupActionTypes.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currGroup: action.payload,
        errorMessage: undefined,
      };
    case groupActionTypes.FETCH_GROUP_FAILURE:
    case groupActionTypes.UPDATE_GROUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case groupActionTypes.TOGGLE_EDIT:
      return {
        ...state,
        isEditTriggered: !state.isEditTriggered,
        errorMessage: undefined,
      };

    default:
      console.log("reducer triggered");
      return state;
  }
};

export default groupReducer;
