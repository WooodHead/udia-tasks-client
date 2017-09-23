import {
  IS_SENDING_AUTH_REQUEST,
  SET_AUTH_REQUEST_ERROR,
  CLEAR_AUTH_REQUEST_ERROR,
  SET_AUTH_REQUEST_SUCCESS,
  CLEAR_AUTH_REQUEST_SUCCESS,
  SET_SELF_USER_TOKEN,
  SET_AUTH_FORM_EMAIL,
  SET_AUTH_FORM_USERNAME,
  SET_AUTH_FORM_PASSWORD,
  SET_AUTH_FORM_PASSWORD_CONFIRMATION,
  SET_AUTH_FORM_OLD_PASSWORD
} from "./constants";
import { parseError } from "../common/actions";

export function isSendingAuthRequest(sendingRequest) {
  return { type: IS_SENDING_AUTH_REQUEST, data: sendingRequest };
}

export function setAuthRequestError(exception) {
  let error = parseError(exception);
  return { type: SET_AUTH_REQUEST_ERROR, data: error };
}

export function clearAuthRequestError() {
  return { type: CLEAR_AUTH_REQUEST_ERROR };
}

export function setAuthRequestSuccess(response) {
  return { type: SET_AUTH_REQUEST_SUCCESS, data: response.detail || response };
}

export function clearAuthRequestSuccess() {
  return { type: CLEAR_AUTH_REQUEST_SUCCESS };
}

export function setSelfUserToken(selfUserToken) {
  return { type: SET_SELF_USER_TOKEN, data: selfUserToken };
}

export function setAuthFormEmail(email) {
  return { type: SET_AUTH_FORM_EMAIL, data: email };
}

export function setAuthFormUsername(username) {
  return { type: SET_AUTH_FORM_USERNAME, data: username };
}

export function setAuthFormPassword(password) {
  return { type: SET_AUTH_FORM_PASSWORD, data: password };
}

export function setAuthFormPasswordConfirmation(passwordConf) {
  return { type: SET_AUTH_FORM_PASSWORD_CONFIRMATION, data: passwordConf };
}

export function setAuthFormOldPassword(oldPassword) {
  return { type: SET_AUTH_FORM_OLD_PASSWORD, data: oldPassword };
}
