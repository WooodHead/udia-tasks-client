import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST
} from "./constants";

export function loginRequest(postBody) {
  return { type: LOGIN_REQUEST, data: postBody };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export function registerRequest(postBody) {
  return { type: REGISTER_REQUEST, data: postBody };
}

export function emailVerificationRequest(postBody) {
  return { type: EMAIL_VERIFICATION_REQUEST, data: postBody };
}

export function changePasswordRequest(postBody) {
  return { type: CHANGE_PASSWORD_REQUEST, data: postBody };
}

export function forgotPasswordRequest(postBody) {
  return { type: FORGOT_PASSWORD_REQUEST, data: postBody };
}

export function resetPasswordRequest(postBody) {
  return { type: RESET_PASSWORD_REQUEST, data: postBody };
}
