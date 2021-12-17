import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  fetchAnswersFailure,
  fetchAnswersSuccess,
  createAnswerFailure,
  createAnswerSuccess,
  fetchGroupAnswersFailure,
  fetchGroupAnswersSuccess,
} from "./answer.actions";

import axios from "axios";

import answerActionTypes from "./answer.types";
import UserActionTypes from "../user/user.types";

export function* fetchAnswersAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/answer/get-group-answers/${action.payload.group}`,
      method: "get",
    });

    const answers = res.data.data;
    yield put(fetchAnswersSuccess(answers));
  } catch (error) {
    yield put(fetchAnswersFailure(error.response.data.message));
  }
}

export function* createAnswerAsync(action) {
  try {
    var formdata = new FormData();
    console.log("hello");
    const { payload } = action;
    formdata.append("user", payload.user);
    formdata.append("question", payload.question);
    if (payload.comment) {
      formdata.append("comment", payload.comment);
    }

    // if (payload.userAnswer) {
    //   formdata.append("userAnswer", payload.userAnswer);
    // }
    if (payload.userCode) {
      formdata.append("userCode", payload.userCode);
    }
    if (payload.selectedOptions) {
      formdata.append(
        "selectedOptions",
        JSON.stringify(payload.selectedOptions)
      );
    }
    if (payload.userAnswers) {
      formdata.append("userAnswers", JSON.stringify(payload.userAnswers));
    }

    console.log(formdata);

    const res = yield axios({
      url: `/api/v1/answer`,
      method: "POST",
      data: formdata,
    });

    const answer = res.data.data;
    answer["group"] = answer.user.group;

    console.log(answer);
    yield put(createAnswerSuccess(answer));
  } catch (error) {
    yield put(createAnswerFailure(error.response.data.message));
  }
}

export function* fetchGroupScoresAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/answer/get-group-scores/${action.payload.group}`,
      method: "get",
    });

    const groupScores = res.data.data;
    yield put(fetchGroupAnswersSuccess(groupScores));
  } catch (error) {
    yield put(fetchGroupAnswersFailure(error.response.data.message));
  }
}
export function* onFetchAnswersStart() {
  yield takeLatest(answerActionTypes.FETCH_ANSWERS_START, fetchAnswersAsync);
}

export function* onCreateAnswerStart() {
  yield takeLatest(answerActionTypes.CREATE_ANSWER_START, createAnswerAsync);
}
export function* onFetchGroupScoresStart() {
  yield takeLatest(
    answerActionTypes.FETCH_GROUP_ANSWERS_START,
    fetchGroupScoresAsync
  );
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchAnswersAsync);
}

export function* onCreateAnswerSuccess() {
  yield takeLatest(answerActionTypes.CREATE_ANSWER_SUCCESS, fetchAnswersAsync);
}

export function* answerSagas() {
  yield all([
    call(onFetchAnswersStart),
    call(onSignInSuccess),
    call(onCreateAnswerSuccess),
    call(onCreateAnswerStart),
    call(onFetchGroupScoresStart),
  ]);
}
