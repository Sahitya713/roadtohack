import groupActionTypes from "./group.types";

export const fetchGroupStart = (hackCode) => ({
  type: groupActionTypes.FETCH_GROUP_START,
  payload: { hackCode: hackCode },
});

export const fetchGroupSuccess = (currGroup) => ({
  type: groupActionTypes.FETCH_GROUP_SUCCESS,
  payload: currGroup,
});

export const fetchGroupFailure = (errorMessage) => ({
  type: groupActionTypes.FETCH_GROUP_FAILURE,
  payload: errorMessage,
});

export const updateGroupStart = (group) => ({
  type: groupActionTypes.UPDATE_GROUP_START,
  payload: group,
});

export const updateGroupSuccess = (currGroup) => ({
  type: groupActionTypes.UPDATE_GROUP_SUCCESS,
  payload: currGroup,
});

export const updateGroupFailure = (errorMessage) => ({
  type: groupActionTypes.UPDATE_GROUP_FAILURE,
  payload: errorMessage,
});

export const toggleEdit = () => ({
  type: groupActionTypes.TOGGLE_EDIT,
});
