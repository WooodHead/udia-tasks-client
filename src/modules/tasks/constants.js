// Reducer actions
export const IS_SENDING_TASK_REQUEST = "IS_SENDING_TASK_REQUEST";
export const SET_TASK_REQUEST_ERROR = "SET_TASK_REQUEST_ERROR";
export const CLEAR_TASK_REQUEST_ERROR = "CLEAR_TASK_REQUEST_ERROR";
export const SET_TASK_REQUEST_SUCCESS = "SET_TASK_REQUEST_SUCCESS";
export const CLEAR_TASK_REQUEST_SUCCESS = "CLEAR_TASK_REQUEST_SUCCESS";
export const CLEAR_TASKS_PAGINATION = "CLEAR_TASKS_PAGINATION";
export const SET_TASKS = "SET_TASKS";
export const ADD_TASKS = "ADD_TASKS";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const SET_TASK_ID = "SET_TASK_ID";
export const SET_TASK_USER_ID = "SET_TASK_USER_ID";
export const SET_TASK_NAME = "SET_TASK_NAME";
export const SET_TASK_TIME_DIFFICULTY = "SET_TASK_TIME_DIFFICULTY";
export const SET_TASK_ENERGY_DIFFICULTY = "SET_TASK_ENERGY_DIFFICULTY";
export const SET_TASK_FOCUS_DIFFICULTY = "SET_TASK_FOCUS_DIFFICULTY";
export const SET_TASK_ADDITIONAL_INFO = "SET_TASK_ADDITIONAL_INFO";
export const SET_TASK_COMPLETED_INFO = "SET_TASK_COMPLETED_INFO";
export const SET_TASK_GOAL_IDS = "SET_TASK_GOAL_IDS";

// Saga actions
export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const GET_TASKS_REQUEST = "GET_TASKS_REQUEST";
export const GET_TASK_REQUEST = "GET_TASK_REQUEST";
export const GET_EDITABLE_TASK_REQUEST = "GET_EDITABLE_TASK_REQUEST";
export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";

// Variable Constants
export const TIME_DIFFICULTY = {
  1: "< 1hr",
  2: "1-2hrs",
  3: "2-4hrs",
  4: "4-8hrs",
  5: "> 8hrs"
};

export const ENERGY_DIFFICULTY = {
  1: "little to no energy",
  2: "a bit of energy",
  3: "moderate energy",
  4: "a lot of energy",
  5: "all of my energy"
};

export const FOCUS_DIFFICULTY = {
  1: "little to no attention",
  2: "a bit of attention",
  3: "concentration",
  4: "focused concentration",
  5: "complete concentration"
};
