import {
  CREATE_TASK_REQUEST,
  GET_TASKS_REQUEST,
  GET_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST
} from "./constants";

export function createTaskRequest(postBody) {
  return { type: CREATE_TASK_REQUEST, data: postBody };
}

export function getTaskRequest(payload) {
  return { type: GET_TASK_REQUEST, data: payload };
}

export function getTasksRequest(payload) {
  return { type: GET_TASKS_REQUEST, data: payload };
}

export function updateTaskRequest(payload) {
  return { type: UPDATE_TASK_REQUEST, data: payload };
}

export function deleteTaskRequest(payload) {
  return { type: DELETE_TASK_REQUEST, data: payload };
}
