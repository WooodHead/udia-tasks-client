import {
  IS_SENDING_TASK_REQUEST,
  SET_TASK_REQUEST_ERROR,
  CLEAR_TASK_REQUEST_ERROR,
  SET_TASK_REQUEST_SUCCESS,
  CLEAR_TASK_REQUEST_SUCCESS,
  CLEAR_TASKS_PAGINATION,
  SET_TASKS,
  ADD_TASKS,
  ADD_TASK,
  SET_TASK_ID,
  SET_TASK_USER_ID,
  SET_TASK_NAME,
  SET_TASK_TIME_DIFFICULTY,
  SET_TASK_ENERGY_DIFFICULTY,
  SET_TASK_FOCUS_DIFFICULTY,
  SET_TASK_ADDITIONAL_INFO,
  SET_TASK_COMPLETED_INFO,
  SET_TASK_GOAL_IDS
} from "./constants";
import { parseError } from "../common/actions";

export function isSendingTaskRequest(isSending) {
  return { type: IS_SENDING_TASK_REQUEST, data: isSending };
}

export function setTaskRequestError(exception) {
  let error = parseError(exception);
  return { type: SET_TASK_REQUEST_ERROR, data: error };
}

export function clearTaskRequestError() {
  return { type: CLEAR_TASK_REQUEST_ERROR };
}

export function setTaskRequestSuccess(response) {
  return { type: SET_TASK_REQUEST_SUCCESS, data: response.detail || response };
}

export function clearTaskRequestSuccess() {
  return { type: CLEAR_TASK_REQUEST_SUCCESS };
}

export function clearTasksPagination() {
  return { type: CLEAR_TASKS_PAGINATION };
}

export function setTasks(response) {
  return { type: SET_TASKS, data: response };
}

export function addTasks(response) {
  return { type: ADD_TASKS, data: response };
}

export function addTask(response) {
  return { type: ADD_TASK, data: response };
}

export function setTaskID(id) {
  return { type: SET_TASK_ID, data: id };
}

export function setTaskUserID(userId) {
  return { type: SET_TASK_USER_ID, data: userId };
}

export function setTaskName(name) {
  return { type: SET_TASK_NAME, data: name };
}

export function setTaskTimeDifficulty(timeDifficulty) {
  return { type: SET_TASK_TIME_DIFFICULTY, data: timeDifficulty };
}

export function setTaskEnergyDifficulty(energyDifficulty) {
  return { type: SET_TASK_ENERGY_DIFFICULTY, data: energyDifficulty };
}

export function setTaskFocusDifficulty(focusDifficulty) {
  return { type: SET_TASK_FOCUS_DIFFICULTY, data: focusDifficulty };
}

export function setTaskAdditionalInfo(additionalInfo) {
  return { type: SET_TASK_ADDITIONAL_INFO, data: additionalInfo };
}

export function setTaskCompletedInfo(completedInfo) {
  return { type: SET_TASK_COMPLETED_INFO, data: completedInfo };
}

export function setTaskGoalIDs(goalIDs) {
  return { type: SET_TASK_GOAL_IDS, data: goalIDs };
}
