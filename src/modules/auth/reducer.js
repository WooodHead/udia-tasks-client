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
import { me } from "./api";

const initialState = {
  isSendingAuthRequest: false,
  authRequestError: "",
  authRequestSuccess: "",
  userToken: me(null),
  email: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  oldPassword: "" // password change functionality
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SENDING_AUTH_REQUEST:
      return {
        ...state,
        isSendingAuthRequest: action.data
      };
    case SET_AUTH_REQUEST_ERROR:
      return {
        ...state,
        authRequestError: action.data
      };
    case CLEAR_AUTH_REQUEST_ERROR:
      return {
        ...state,
        authRequestError: ""
      };
    case SET_AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        authRequestSuccess: ""
      };
    case CLEAR_AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        authRequestSuccess: ""
      };
    case SET_SELF_USER_TOKEN:
      return {
        ...state,
        userToken: me(action.data)
      };
    case SET_AUTH_FORM_EMAIL:
      return {
        ...state,
        email: action.data
      };
    case SET_AUTH_FORM_USERNAME:
      return {
        ...state,
        username: action.data
      };
    case SET_AUTH_FORM_PASSWORD:
      return {
        ...state,
        password: action.data
      };
    case SET_AUTH_FORM_PASSWORD_CONFIRMATION:
      return {
        ...state,
        passwordConfirmation: action.data
      };
    case SET_AUTH_FORM_OLD_PASSWORD:
      return {
        ...state,
        oldPassword: action.data
      };
    default:
      return state;
  }
}

export default authReducer;