import {
  CREATE_GOAL_REQUEST,
  GET_GOAL_REQUEST,
  GET_GOALS_REQUEST,
  GET_EDITABLE_GOAL_REQUEST,
  UPDATE_GOAL_REQUEST,
  DELETE_GOAL_REQUEST
} from "./constants";

export function createGoalRequest(postBody) {
  return { type: CREATE_GOAL_REQUEST, data: postBody };
}

export function getGoalRequest(payload) {
  return { type: GET_GOAL_REQUEST, data: payload };
}

export function getGoalsRequest(payload) {
  return { type: GET_GOALS_REQUEST, data: payload };
}

export function getEditableGoalRequest(payload) {
  return { type: GET_EDITABLE_GOAL_REQUEST, data: payload };
}

export function updateGoalRequest(payload) {
  return { type: UPDATE_GOAL_REQUEST, data: payload };
}

export function deleteGoalRequest(payload) {
  return { type: DELETE_GOAL_REQUEST, data: payload };
}
