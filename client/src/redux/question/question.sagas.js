import { takeLatest, all, put, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";

import axios from "axios";
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  downloadInputFailure,
  // downloadInputSuccess,
} from "./question.actions";
import questionActionTypes from "./question.types";

export function* fetchQuestionsAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/question/get-questions/${action.payload.hackCode}`,
      method: "get",
    });

    const questions = res.data.data;
    yield put(fetchQuestionsSuccess(questions));
  } catch (error) {
    yield put(fetchQuestionsFailure(error.message));
  }
}

export function* downloadInputAsync(action) {
  try {
    const response = yield axios({
      url: `/api/v1/question/download/${action.payload.url}`,
      method: "get",
    });

    const link = document.createElement("a");
    link.href = response.data.data;
    link.setAttribute("download", "file2.py");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    yield put(downloadInputFailure(error));
  }
}
export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchQuestionsAsync);
}

export function* downloadInputFile() {
  yield takeLatest(
    questionActionTypes.DOWNLOAD_INPUT_START,
    downloadInputAsync
  );
}

export function* questionSagas() {
  yield all([call(onSignInSuccess), call(downloadInputFile)]);
}
