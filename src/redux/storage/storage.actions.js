import { StorageActionTypes } from "./storage.types";

export const addCurrentUser = (user) => {
  return {
    type: StorageActionTypes.ADD_CURRENT_USER,
    payload: user
  }
}

export const deleteCurrentUser = () => {
  return {
    type: StorageActionTypes.DELETE_CURRENT_USER,
    payload: null
  }
}

export const storageToggleBearer = (status) => ({
  type: StorageActionTypes.STORAGE_TOGGLE_BEARER,
  payload: status
})

export const setCartCount = (values) => {
  return {
    type: StorageActionTypes.SET_CART_COUNT,
    payload: values
  }
}

export const plusCartCount = () => {
  return {
    type: StorageActionTypes.PLUS_CART_COUNT,
    payload: null
  }
}

export const subtractCartCount = () => {
  return {
    type: StorageActionTypes.SUBTRACT_CART_COUNT,
    payload: null
  }
}

export const createAnonymousId = (id) => {
  return {
    type: StorageActionTypes.CREATE_ANONYMOUS_ID,
    payload: id
  }
}

export const addRecentlyDevice = (device) => {
  return {
    type: StorageActionTypes.ADD_RECENTLY_DEVICE,
    payload: device
  }
}
