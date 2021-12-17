import { createSelector } from "reselect";

import { RegStatusTypes } from "./user.types";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserName = createSelector([selectUser], (user) =>
  user.currentUser ? user.currentUser.displayName : ""
);

export const isUserFetching = createSelector(
  [selectUser],
  (user) => !!user.isFetching
);

export const selectSignInError = createSelector([selectUser], (user) => {
  if (user.regStatus === RegStatusTypes.SIGN_IN) {
    return user.error;
  }
  return null;
});

export const selectSignUpError = createSelector([selectUser], (user) => {
  if (user.regStatus === RegStatusTypes.SIGN_UP) {
    return user.error;
  }
  return null;
});
