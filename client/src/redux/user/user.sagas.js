import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signOutFailure,
  signOutSuccess,
  checkUserSessionEnd,
} from "./user.actions";

import { auth, getCurrentUser } from "../../firebase.utils";

// export function* getSnapshotFromUserAuth(userAuth, additionalData) {
//     try {
//       const userRef = yield call(
//         createUserProfileDocument,
//         userAuth,
//         additionalData
//       );
//       const userSnapshot = yield userRef.get();
//       yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//     } catch (error) {
//       yield put(signInFailure(error));
//     }
//   }

export function* getUserData(userAuth) {
  const { uid } = userAuth;
  try {
    console.log(uid);
    const res = yield axios({
      url: `/api/v1/user/${uid}`,
      method: "get",
    });
    console.log("get user data");
    console.log(res.data.data);
    yield put(signInSuccess(res.data.data));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserData(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return yield put(checkUserSessionEnd());
    yield getUserData(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}
function* signUp({
  payload: { email, password, displayName, group, hackCode },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const res = yield axios({
      url: "/api/v1/user",
      method: "POST",
      data: {
        uid: user.uid,
        displayName,
        email,
        hackCode,
        group,
      },
    });
    yield put(signInSuccess(res.data.data));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   //   yield getSnapshotFromUserAuth(user, additionalData);
// }
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

// export function* onSignUpSuccess() {
//   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }
export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession),
    call(onSignUpStart),
  ]);
}
