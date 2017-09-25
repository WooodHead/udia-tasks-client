import { localStorage, get, post } from "../baseApi";

/**
 * Set the user's auth token, and return the value
 * @param {string} newToken - new user token string
 */
export function localToken(newToken) {
  if (typeof newToken === "string") {
    // if empty string, assume intent is to delete the token
    if (newToken) {
      localStorage.setItem("udiaUserToken", newToken);
    } else {
      localStorage.removeItem("udiaUserToken");
    }
  }
  const userToken = localStorage.getItem("udiaUserToken");
  return userToken ? userToken : "";
}

/**
 * Function wrapping POST request for user login, use either email or username
 * @param {string} email - email of user to login
 * @param {string} password - password of user to login
 */
export function login(email, password) {
  return post("/auth/login/", {
    email,
    password
  }).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for user logout
 */
export function logout() {
  return post("/auth/logout/").then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for user registration
 * @param {string} email - email of user to register
 * @param {string} username - username of user to register
 * @param {string} password1 - password of user to register
 * @param {string} password2 - server side password confirmation
 */
export function register(email, username, password1, password2) {
  return post("/auth/registration/", {
    email,
    username,
    password1,
    password2
  }).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for email validation
 * @param {string} key - key for emai lvalidation
 */
export function verifyEmail(key) {
  return post("/auth/registration/verify-email/", { key }).then(resp =>
    Promise.resolve(resp)
  );
}

/**
 * Function wrapping POST request for change password
 * @param {string} new_password1 - user new password
 * @param {string} new_password2 - user new password confirmation
 * @param {string} old_password - old password of user
 */
export function changePassword(new_password1, new_password2, old_password) {
  return post("/auth/password/change/", {
    new_password1,
    new_password2,
    old_password
  }).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for forgot password email send
 * @param {string} email - email of user for password reset
 */
export function forgotPassword(email) {
  return post("/auth/password/reset/", { email }).then(resp =>
    Promise.resolve(resp)
  );
}

/**
 * Function wrapping POST request for resetting a user's password
 * @param {string} uid - forgot password uid
 * @param {*} token - forgot password token
 * @param {*} new_password1 - user new password
 * @param {*} new_password2 - user new password confirmation
 */
export function resetPassword(uid, token, new_password1, new_password2) {
  return post("/auth/password/reset/confirm/", {
    uid,
    token,
    new_password1,
    new_password2
  }).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping GET request for getting a user
 * @param {object} params - GET request url params (eg. {"page":2})
 */
export function currentUser(params) {
  return get("/users/", params).then(resp => Promise.resolve(resp));
}
