import { UserActionTypes } from "./user.types";

export const loginStart = (values) => {
  return {
    type: UserActionTypes.EMAIL_LOGIN_START,
    payload: values
  }
}

export const loginSuccess = (user) => {
  return {
    type: UserActionTypes.EMAIL_LOGIN_SUCCESS,
    payload: user
  }
}

export const loginFailed = (errorCode) => {
  return {
    type: UserActionTypes.EMAIL_LOGIN_FAILED,
    payload: errorCode
  }
}

export const registerStart = (values) => {
  return {
    type: UserActionTypes.REGISTRATION_START,
    payload: values
  }
}

export const registerSuccess = () => {
  return {
    type: UserActionTypes.REGISTRATION_SUCCESS,
    payload: null
  }
}

export const registerFailed = () => {
  return {
    type: UserActionTypes.REGISTRATION_FAILED,
    payload: null
  }
}

export const checkEmailStart = (values) => {
  return {
    type: UserActionTypes.CHECK_EMAIL_START,
    payload: values
  }
}

export const checkEmailSuccess = (user) => {
  return {
    type: UserActionTypes.CHECK_EMAIL_SUCCESS,
    payload: user
  }
}

export const checkEmailFailed = (errorCode) => {
  return {
    type: UserActionTypes.CHECK_EMAIL_FAILED,
    payload: errorCode
  }
}

export const logoutStart = (values) => {
  return {
    type: UserActionTypes.LOGOUT_START,
    payload: values
  }
}

export const logoutSuccess = () => {
  return {
    type: UserActionTypes.LOGOUT_SUCCESS,
    payload: null
  }
}

export const logoutFailed = (errorCode) => {
  return {
    type: UserActionTypes.LOGOUT_FAILED,
    payload: errorCode
  }
}

export const confirmEmailStart = (values) => {
  return {
    type: UserActionTypes.CONFIRM_EMAIL_START,
    payload: values
  }
}

export const confirmEmailSuccess = () => {
  return {
    type: UserActionTypes.CONFIRM_EMAIL_SUCCESS,
    payload: null
  }
}

export const confirmEmailFailed = () => {
  return {
    type: UserActionTypes.CONFIRM_EMAIL_FAILED,
    payload: null
  }
}

export const clearCheckEmail = () => {
  return {
    type: UserActionTypes.CLEAR_CHECK_EMAIL,
    payload: null
  }
}
