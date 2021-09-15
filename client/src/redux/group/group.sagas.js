import { takeLatest, all, put, call } from "redux-saga/effects";

import {
  fetchGroupFailure,
  fetchGroupSuccess,
  updateGroupFailure,
  updateGroupSuccess,
} from "./group.actions";
import UserActionTypes from "../user/user.types";
// import groupActionTypes from "./group.types";

import axios from "axios";

import groupActionTypes from "./group.types";

export function* fetchGroupAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/group/${action.payload.group}`,
      method: "get",
    });

    const group = res.data.data;
    yield put(fetchGroupSuccess(group));
  } catch (error) {
    yield put(fetchGroupFailure(error.message));
  }
}
export function* updateGroupAsync(action) {
  try {
    var formdata = new FormData();

    const { groupId, group } = action.payload;
    if (group.name) {
      formdata.append("name", group.name);
    }
    if (group.image) {
      formdata.append("image", group.image);
    }

    const res = yield axios({
      url: `/api/v1/group/${groupId}`,
      method: "PATCH",
      data: formdata,
    });

    const grp = res.data.data;

    yield put(updateGroupSuccess(grp));
  } catch (error) {
    yield put(updateGroupFailure(error.message));
  }
}

export function* onUpdateGroup() {
  yield takeLatest(groupActionTypes.UPDATE_GROUP_START, updateGroupAsync);
}
export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchGroupAsync);
}

export function* groupSagas() {
  yield all([call(onSignInSuccess), call(onUpdateGroup)]);
}
