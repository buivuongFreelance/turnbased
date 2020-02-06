import { createSelector } from "reselect";

const selectStorage = state => state.storage;

export const selectCurrentUser = createSelector(
  [selectStorage],
  (storage) => storage.currentUser
);

export const selectBearer = createSelector(
  [selectStorage],
  (storage) => storage.bearer
);

export const selectCartCount = createSelector(
  [selectStorage],
  (storage) => storage.cartCount
);

export const selectAnonymousId = createSelector(
  [selectStorage],
  (storage) => storage.anonymousId
);

export const selectLang = createSelector(
  [selectStorage],
  (storage) => storage.lang
);
