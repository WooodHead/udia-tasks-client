import { effects } from "redux-saga";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RETRIEVE_SELF_USER_REQUEST
} from "./auth/constants";
import {
  loginFlow,
  logoutFlow,
  registerFlow,
  verifyEmailFlow,
  changePasswordFlow,
  forgotPasswordFlow,
  resetPasswordFlow,
  retrieveSelfUserFlow
} from "./auth/sagas";

export default function* rootSaga() {
  // Authentication related sagas
  yield effects.takeLatest(LOGIN_REQUEST, loginFlow);
  yield effects.takeLatest(LOGOUT_REQUEST, logoutFlow);
  yield effects.takeLatest(REGISTER_REQUEST, registerFlow);
  yield effects.takeLatest(EMAIL_VERIFICATION_REQUEST, verifyEmailFlow);
  yield effects.takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordFlow);
  yield effects.takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordFlow);
  yield effects.takeLatest(RESET_PASSWORD_REQUEST, resetPasswordFlow);
  yield effects.takeLatest(RETRIEVE_SELF_USER_REQUEST, retrieveSelfUserFlow);
}
