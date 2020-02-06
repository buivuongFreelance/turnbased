import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  loading: false,
  checkEmail: false,
  errorCode: 200,
  confirmEmail: false,
  loadingCheckEmail: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_LOGIN_START:
      state.loading = true;
      return state;
    case UserActionTypes.EMAIL_LOGIN_SUCCESS:
      state.loading = false;
      state.errorCode = 200;
      return state;
    case UserActionTypes.EMAIL_LOGIN_FAILED:
      state.loading = false;
      state.errorCode = action.payload;
      return state;
    case UserActionTypes.REGISTRATION_START:
      state.loading = true;
      return state;
    case UserActionTypes.REGISTRATION_SUCCESS:
      state.loading = false;
      return state;
    case UserActionTypes.REGISTRATION_FAILED:
      state.loading = false;
      return state;
    case UserActionTypes.CHECK_EMAIL_START:
      state.checkEmail = false;
      state.loadingCheckEmail = true;
      return state;
    case UserActionTypes.CHECK_EMAIL_SUCCESS:
      state.checkEmail = true;
      state.loadingCheckEmail = false;
      return state;
    case UserActionTypes.CHECK_EMAIL_FAILED:
      state.checkEmail = false;
      state.loadingCheckEmail = false;
      return state;
    case UserActionTypes.LOGOUT_START:
      state.loading = true;
      return state;
    case UserActionTypes.LOGOUT_SUCCESS:
      state.loading = false;
      return state;
    case UserActionTypes.LOGOUT_FAILED:
      state.loading = false;
      return state;
    case UserActionTypes.CONFIRM_EMAIL_START:
      state.confirmEmail = false;
      return state;
    case UserActionTypes.CONFIRM_EMAIL_SUCCESS:
      state.confirmEmail = true;
      return state;
    case UserActionTypes.CONFIRM_EMAIL_FAILED:
      state.confirmEmail = false;
      return state;
    case UserActionTypes.CLEAR_CHECK_EMAIL:
      state.checkEmail = false;
      return state;
    default:
      return state;
  }
};

export default userReducer;
