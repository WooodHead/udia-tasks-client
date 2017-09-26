import {
  IS_SENDING_GOAL_REQUEST,
  SET_GOAL_REQUEST_ERROR,
  CLEAR_GOAL_REQUEST_ERROR,
  SET_GOAL_REQUEST_SUCCESS,
  CLEAR_GOAL_REQUEST_SUCCESS,
  CLEAR_GOALS_PAGINATION,
  SET_GOALS,
  ADD_GOALS,
  ADD_GOAL,
  REMOVE_GOAL,
  SET_GOAL_ID,
  SET_GOAL_USER_ID,
  SET_GOAL_NAME,
  SET_GOAL_TAG,
  SET_GOAL_ADDITIONAL_INFO
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

export function clearGoalsPagination() {
  return { type: CLEAR_GOALS_PAGINATION };
}

export function setGoals(response) {
  return { type: SET_GOALS, data: response };
}

export function addGoals(response) {
  return { type: ADD_GOALS, data: response };
}

export function addGoal(response) {
  return { type: ADD_GOAL, data: response };
}

export function removeGoal(id) {
  return { type: REMOVE_GOAL, data: id };
}

export function setGoalID(id) {
  return { type: SET_GOAL_ID, data: id };
}

export function setGoalUserID(userId) {
  return { type: SET_GOAL_USER_ID, data: userId };
}

export function setGoalName(name) {
  return { type: SET_GOAL_NAME, data: name };
}

export function setGoalTag(tag) {
  return { type: SET_GOAL_TAG, data: tag };
}

export function setGoalAdditionalInfo(additionalInfo) {
  return { type: SET_GOAL_ADDITIONAL_INFO, data: additionalInfo };
}
