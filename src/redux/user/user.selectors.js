import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectLoadingUser = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectErrorCode = createSelector(
  [selectUser],
  (user) => user.errorCode
);

export const selectLoadingCheckEmail = createSelector(
  [selectUser],
  (user) => user.loadingCheckEmail
);

export const selectCheckEmail = createSelector(
  [selectUser],
  (user) => user.checkEmail
);

export const selectConfirmEmail = createSelector(
  [selectUser],
  (user) => user.confirmEmail
);
