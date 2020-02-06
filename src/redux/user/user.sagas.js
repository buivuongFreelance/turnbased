import { takeLatest, select, call, all, put } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";

import {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  registerSuccess,
  registerFailed,
  checkEmailSuccess,
  checkEmailFailed,
  confirmEmailSuccess,
  confirmEmailFailed
} from "./user.actions";

import { addBearerHeader, addClientHeader, clearNotifyProposal } from "../screen/screen.actions";

import { SERVER_VERSION } from "../../config";
import { addCurrentUser, deleteCurrentUser, storageToggleBearer, setCartCount } from "../storage/storage.actions";
import { getQueryString } from "../../utils";

export function* confirmEmail({ payload: { activeCode, history } }) {
  const state = yield select();
  const { screen: { apiInstance } } = state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'user/confirmEmail/' + activeCode,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      transformRequest: getQueryString
    })
    yield put(confirmEmailSuccess());

    yield history.push('/signInAndSignUp');
    yield alertify.success('Confirm Email Successful. Please Sign In.');
  } catch (response) {
    if (response) {
      yield put(confirmEmailFailed());
      yield alertify.error('Confirm Email Failed');
    } else {
      yield put(confirmEmailFailed());
    }
  }
}

export function* logout({ payload: { } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'user/logout',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      transformRequest: getQueryString
    })
    yield put(logoutSuccess());
    yield put(addClientHeader());
    yield put(deleteCurrentUser());
    yield put(storageToggleBearer(false));
    yield put(setCartCount(0));
    yield put(clearNotifyProposal());
    yield alertify.success(translator.translate('lbl_success_logout'));
  } catch (response) {
    if (response) {
      yield put(logoutFailed());
      yield alertify.error(translator.translate('lbl_error_logout'));
    } else {
      yield put(logoutFailed());
    }
  }
}

export function* checkEmail({ payload: { email } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'user/checkEmail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        email
      },
      transformRequest: getQueryString
    })
    yield put(checkEmailSuccess());
  } catch (response) {
    if (response) {
      yield put(checkEmailFailed());
      yield alertify.error(translator.translate('lbl_error_email_exists'));
    } else {
      yield put(checkEmailFailed());
    }
  }
}

export function* loginWithEmail({ payload: { email, password, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = state;

  try {
    let res = yield apiInstance({
      method: 'post',
      url: '/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        grant_type: 'password',
        username: email,
        password,
        anonymousCarts: []
      },
      transformRequest: getQueryString
    })
    const { data: { accessToken, user } } = yield res;
    const currentUser = yield {
      accessToken,
      id: user.id,
      email: user.email
    };

    yield addBearerHeader(accessToken);
    yield put(loginSuccess(currentUser));
    yield put(addCurrentUser(currentUser));
    yield put(storageToggleBearer(true));
    yield history.push('/');
    yield alertify.success(translator.translate('lbl_success_login'));
  } catch (response) {
    yield put(deleteCurrentUser());
    if (response) {
      yield put(storageToggleBearer(false));
      yield put(loginFailed(500));
      yield alertify.error(translator.translate('lbl_error_login'));
    } else {
      yield put(loginFailed(408));
    }
  }
}

export function* register({ payload: { email, password, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'user/register',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        email,
        password,
        first_question_id: 1,
        first_answer: 'test1',
        second_question_id: 2,
        second_answer: 'test2'
      },
      transformRequest: getQueryString
    })
    yield put(registerSuccess());
    yield history.push('/signInAndSignUp');
    yield alertify.success(translator.translate('lbl_success_register'));
  } catch (response) {
    if (response) {
      const { data: { error: { code } } } = yield response;
      yield put(registerFailed());
      if (code === 'RESOURCE_EXIST')
        yield alertify.error(translator.translate('lbl_error_email_exists'));
      else
        yield alertify.error(translator.translate('lbl_error_common'));
    } else {
      yield put(registerFailed());
    }
  }
}

export function* onConfirmEmailStart() {
  yield takeLatest(
    UserActionTypes.CONFIRM_EMAIL_START,
    confirmEmail
  );
}

export function* onLogoutStart() {
  yield takeLatest(
    UserActionTypes.LOGOUT_START,
    logout
  );
}

export function* onLoginStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_LOGIN_START,
    loginWithEmail
  );
}

export function* onRegisterStart() {
  yield takeLatest(
    UserActionTypes.REGISTRATION_START,
    register
  );
}

export function* onCheckEmailStart() {
  yield takeLatest(
    UserActionTypes.CHECK_EMAIL_START,
    checkEmail
  );
}

export function* userSagas() {
  yield all([
    call(onLoginStart),
    call(onRegisterStart),
    call(onCheckEmailStart),
    call(onConfirmEmailStart),
    call(onLogoutStart)
  ]);
}
