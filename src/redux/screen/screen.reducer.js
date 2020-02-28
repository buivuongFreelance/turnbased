import { ScreenActionTypes } from "./screen.types";
import { Translator } from '@eo-locale/core';
import locales from "../../utils/locales";

const INITIAL_STATE = {
  stage: null,
  translator: null,
  layers: {},
  images: {}
};

const screenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ScreenActionTypes.SET_LANGUAGE:
      state.translator = new Translator(action.payload, locales);
      return state;
    case ScreenActionTypes.ADD_STAGE:
      state.stage = action.payload;
      return state;
    case ScreenActionTypes.ADD_LAYER:
      var { name, layer } = action.payload;
      state.layers[name] = layer;
      return state;
    case ScreenActionTypes.ADD_IMAGE:
      var { name, image } = action.payload;
      state.images[name] = image;
      return state;
    case ScreenActionTypes.CLEAR_STAGE:
      state.stage = null;
      return state;
    case ScreenActionTypes.CLEAR_LAYER:
      var { name } = action.payload;
      delete state.layers[name];
      return state;
    case ScreenActionTypes.CLEAR_IMAGE:
      var { name } = action.payload;
      delete state.images[name];
      return state;
    default:
      return state;
  }
};

export default screenReducer;
