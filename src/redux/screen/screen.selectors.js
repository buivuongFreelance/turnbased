import { createSelector } from "reselect";

const selectScreen = state => state.screen;

export const selectTranslator = createSelector(
  [selectScreen],
  (screen) => screen.translator
);

export const selectStage = createSelector(
  [selectScreen],
  (screen) => screen.stage
);

export const selectLayers = createSelector(
  [selectScreen],
  (screen) => screen.layers
);

export const selectImages = createSelector(
  [selectScreen],
  (screen) => screen.images
);
