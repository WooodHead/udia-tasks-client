import { effects } from "redux-saga";
import {
  login,
  logout,
  register,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword
} from "./api";
import {
  isSendingAuthRequest,
  setAuthRequestError,
  clearAuthRequestError,
  setAuthRequestSuccess,
  clearAuthRequestSuccess,
  setSelfUserToken,
  setAuthFormEmail,
  setAuthFormUsername,
  setAuthFormPassword,
  setAuthFormPasswordConfirmation,
  setAuthFormOldPassword
} from "./reducer.actions";

function* loginCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { email, password } = postBody;
  try {
    return yield effects.call(login, email, password);
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* loginFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(loginCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setSelfUserToken(wasSuccessful.key));
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
    yield effects.put(setAuthFormEmail(""));
    yield effects.put(setAuthFormUsername(""));
    yield effects.put(setAuthFormPassword(""));
    yield effects.put(setAuthFormPasswordConfirmation(""));
    yield effects.put(setAuthFormOldPassword(""));
  }
}

export function* logoutFlow() {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  yield effects.call(logout);
  yield effects.put(setSelfUserToken(""));
}

function* registerCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { email, username, password1, password2 } = postBody;
  try {
    return yield effects.call(register, email, username, password1, password2);
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* registerFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(registerCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setSelfUserToken(wasSuccessful.key));
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
    yield effects.put(setAuthFormEmail(""));
    yield effects.put(setAuthFormUsername(""));
    yield effects.put(setAuthFormPassword(""));
    yield effects.put(setAuthFormPasswordConfirmation(""));
    yield effects.put(setAuthFormOldPassword(""));
  }
}

function* verifyEmailCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { key } = postBody;
  try {
    return yield effects.call(verifyEmail, key);
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* verifyEmailFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(verifyEmailCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
  }
}

function* changePasswordCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { new_password1, new_password2, old_password } = postBody;
  try {
    return yield effects.call(
      changePassword,
      new_password1,
      new_password2,
      old_password
    );
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* changePasswordFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(changePasswordCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
    yield effects.put(setAuthFormEmail(""));
    yield effects.put(setAuthFormUsername(""));
    yield effects.put(setAuthFormPassword(""));
    yield effects.put(setAuthFormPasswordConfirmation(""));
    yield effects.put(setAuthFormOldPassword(""));
  }
}

function* forgotPasswordCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { email } = postBody;
  try {
    return yield effects.call(forgotPassword, email);
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* forgotPasswordFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(forgotPasswordCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
    yield effects.put(setAuthFormEmail(""));
    yield effects.put(setAuthFormUsername(""));
    yield effects.put(setAuthFormPassword(""));
    yield effects.put(setAuthFormPasswordConfirmation(""));
    yield effects.put(setAuthFormOldPassword(""));
  }
}

function* resetPasswordCall(postBody) {
  yield effects.put(isSendingAuthRequest(true));
  const { uid, token, new_password1, new_password2 } = postBody;
  try {
    return yield effects.call(
      resetPassword,
      uid,
      token,
      new_password1,
      new_password2
    );
  } catch (exception) {
    yield effects.put(setAuthRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingAuthRequest(false));
  }
}

export function* resetPasswordFlow(request) {
  yield effects.put(clearAuthRequestError());
  yield effects.put(clearAuthRequestSuccess());
  const wasSuccessful = yield effects.call(resetPasswordCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setAuthRequestSuccess(wasSuccessful));
    yield effects.put(clearAuthRequestError());
    yield effects.put(setAuthFormEmail(""));
    yield effects.put(setAuthFormUsername(""));
    yield effects.put(setAuthFormPassword(""));
    yield effects.put(setAuthFormPasswordConfirmation(""));
    yield effects.put(setAuthFormOldPassword(""));
  }
}
