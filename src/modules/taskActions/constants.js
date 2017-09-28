// Reducer actions
export const IS_SENDING_TASK_ACTION_REQUEST = "IS_SENDING_TASK_ACTION_REQUEST";
export const SET_TASK_ACTION_REQUEST_ERROR = "SET_TASK_ACTON_REQUEST_ERROR";
export const CLEAR_TASK_ACTION_REQUEST_ERROR =
  "CLEAR_TASK_ACTION_REQUEST_ERROR";
export const SET_TASK_ACTION_REQUEST_SUCCESS =
  "SET_TASK_ACTION_REQUEST_SUCCESS";
export const CLEAR_TASK_ACTION_REQUEST_SUCCESS =
  "CLEAR_TASK_ACTION_REQUEST_SUCCESS";

// Saga actions
export const CREATE_TASK_ACTION_REQUEST = "CREATE_TASK_ACTION_REQUEST";

// Variable Constants
export const ACTION_TYPE = {
  0: "Backlog",
  1: "Prioritized",
  2: "In Progress",
  3: "Paused",
  4: "Completed",
  5: "Discarded"
};

export const ACTIONING_TYPE = {
  0: "Undefined",
  1: "Prioritize",
  2: "Begin/Resume Progress",
  3: "Pause",
  4: "Complete",
  5: "Discard",
}

// Mapping from action to next action
export const ACTION_TRANSITIONS = {
  0: [1, 5], // Backlog tasks can be prioritized or discarded
  1: [2, 5], // Prioritized tasks can be in progressed' or discarded
  2: [3, 4, 5], // In progress tasks can be paused, completed, or discarded
  3: [2, 5], // Paused tasks can be Resumed (in progress) or discarded
  4: [], // Completed tasks are finished
  5: [] // Discarded tasks are finished
};
