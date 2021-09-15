import { createSelector } from "reselect";

export const selectGroup = (state) => state.group;

export const selectCurrGroup = createSelector(
  [selectGroup],
  (group) => group.currGroup
);

export const selectGroupEdit = createSelector(
  [selectGroup],
  (group) => group.isEditTriggered
);
