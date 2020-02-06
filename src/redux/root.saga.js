import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { deviceSagas } from "./device/device.sagas";
import { orderSagas } from "./order/order.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(deviceSagas),
    call(orderSagas)
  ]);
}
