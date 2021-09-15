import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  fetchChallengeFailure,
  fetchChallengeSuccess,
  updateStatus,
} from "./challenge.actions";

import axios from "axios";

import challengeActionTypes from "./challenge.types";
import UserActionTypes from "../user/user.types";

export function* fetchChallengeAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/challenge/${action.payload.hackCode}`,
      method: "get",
    });
    const challenge = res.data.data[0];

    yield put(fetchChallengeSuccess(challenge));
    yield put(updateStatus());
  } catch (error) {
    yield put(fetchChallengeFailure(error.message));
  }
}

export function* fetchChallengeStart() {
  yield takeLatest(
    challengeActionTypes.FETCH_CHALLENGE_START,
    fetchChallengeAsync
  );
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchChallengeAsync);
}

export function* challengeSagas() {
  yield all([call(fetchChallengeStart), call(onSignInSuccess)]);
}
