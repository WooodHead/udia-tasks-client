import {
  IS_SENDING_GOAL_REQUEST,
  SET_GOAL_REQUEST_ERROR,
  CLEAR_GOAL_REQUEST_ERROR,
  SET_GOAL_REQUEST_SUCCESS,
  CLEAR_GOAL_REQUEST_SUCCESS
} from "./constants";
import { parseError } from "../common/actions";

export function isSendingGoalRequest(isSending) {
  return { type: IS_SENDING_GOAL_REQUEST, data: isSending };
}

export function setGoalRequestError(exception) {
  let error = parseError(exception);
  return { type: SET_GOAL_REQUEST_ERROR, data: error };
}

export function clearGoalRequestError() {
  return { type: CLEAR_GOAL_REQUEST_ERROR };
}

export function setGoalRequestSuccess(response) {
  return { type: SET_GOAL_REQUEST_SUCCESS, data: response.detail || response };
}

export function clearGoalRequestSuccess() {
  return { type: CLEAR_GOAL_REQUEST_SUCCESS };
}
