import { ScreenActionTypes } from "./screen.types";

export const setLanguage = (lang) => {
  return {
    type: ScreenActionTypes.SET_LANGUAGE,
    payload: lang
  }
}

export const addStage = (stage) => {
  return {
    type: ScreenActionTypes.ADD_STAGE,
    payload: stage
  }
}

export const addLayer = ({ name, layer }) => {
  return {
    type: ScreenActionTypes.ADD_LAYER,
    payload: { name, layer }
  }
}

export const addImage = ({ name, image }) => {
  return {
    type: ScreenActionTypes.ADD_IMAGE,
    payload: { name, image }
  }
}

export const clearStage = () => {
  return {
    type: ScreenActionTypes.CLEAR_STAGE,
    payload: null
  }
}

export const clearLayer = (name) => {
  return {
    type: ScreenActionTypes.CLEAR_LAYER,
    payload: name
  }
}

export const clearImage = (name) => {
  return {
    type: ScreenActionTypes.CLEAR_IMAGE,
    payload: name
  }
}
