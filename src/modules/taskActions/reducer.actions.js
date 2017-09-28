import {
  IS_SENDING_TASK_ACTION_REQUEST,
  SET_TASK_ACTION_REQUEST_ERROR,
  CLEAR_TASK_ACTION_REQUEST_ERROR,
  SET_TASK_ACTION_REQUEST_SUCCESS,
  CLEAR_TASK_ACTION_REQUEST_SUCCESS
} from "./constants";
import { parseError } from "../common/actions";

export function isSendingTaskActionRequest(isSending) {
  return { type: IS_SENDING_TASK_ACTION_REQUEST, data: isSending };
}

export function setTaskActionRequestError(exception) {
  let error = parseError(exception);
  return { type: SET_TASK_ACTION_REQUEST_ERROR, data: error };
}

export function clearTaskActionRequestError() {
  return { type: CLEAR_TASK_ACTION_REQUEST_ERROR };
}

export function setTaskActionRequestSuccess(response) {
  return {
    type: SET_TASK_ACTION_REQUEST_SUCCESS,
    data: response.detail || response
  };
}

export function clearTaskActionRequestSuccess() {
  return { type: CLEAR_TASK_ACTION_REQUEST_SUCCESS };
}
