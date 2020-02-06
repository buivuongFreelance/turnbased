import { combineReducers } from "redux-immer";

import produce from "immer";

import userReducer from "./user/user.reducer";
import storageReducer from "./storage/storage.reducer";
import screenReducer from "./screen/screen.reducer";
import deviceReducer from "./device/device.reducer";
import orderReducer from "./order/order.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['storage']
}

const rootReducer = combineReducers(produce, {
  storage: storageReducer,
  user: userReducer,
  screen: screenReducer,
  device: deviceReducer,
  order: orderReducer
});

export default persistReducer(persistConfig, rootReducer);
