import { StorageActionTypes } from "./storage.types";
import { ScreenActionTypes } from "../screen/screen.types";

const INITIAL_STATE = {
  currentUser: null,
  bearer: false,
  cartCount: 0,
  anonymousId: '',
  recentDevices: [],
  lang: 'en'
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StorageActionTypes.ADD_CURRENT_USER:
      state.currentUser = action.payload;
      return state;
    case StorageActionTypes.DELETE_CURRENT_USER:
      state.currentUser = null;
      return state;
    case StorageActionTypes.STORAGE_TOGGLE_BEARER:
      state.bearer = action.payload;
      return state;
    case StorageActionTypes.SET_CART_COUNT:
      state.cartCount = action.payload;
      return state;
    case StorageActionTypes.PLUS_CART_COUNT:
      state.cartCount = state.cartCount + 1;
      return state;
    case StorageActionTypes.SUBTRACT_CART_COUNT:
      state.cartCount = state.cartCount - 1;
      return state;
    case StorageActionTypes.CREATE_ANONYMOUS_ID:
      state.anonymousId = action.payload;
      return state;
    case StorageActionTypes.ADD_RECENTLY_DEVICE:
      state.recentDevices.unshift(action.payload);
      if (state.recentDevices.length > 10)
        state.recentDevices.pop();
      return state;
    case ScreenActionTypes.SET_LANGUAGE:
      state.lang = action.payload;
      return state;
    default:
      return state;
  }
};

export default userReducer;
