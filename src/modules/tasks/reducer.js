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

const initialState = {
  isSendingTaskRequest: false,
  taskRequestError: "",
  taskRequestSuccess: "",
  tasks: {},
  tasksOrdering: [],
  tasksPagination: {},
  currentTaskID: 0,
  userID: 0,
  name: "",
  timeDifficulty: 1,
  energyDifficulty: 2,
  focusDifficulty: 3,
  additionalInfo: {},
  completedInfo: {},
  goalIDs: []
};

function tasksReducer(state = initialState, action) {
  let count = 0;
  let next = null;
  let previous = null;
  let results = [];
  let tasksPagination = { count, next, previous };
  let tasks = {};
  let tasksOrdering = [];
  let task = {};

  switch (action.type) {
    case IS_SENDING_TASK_REQUEST:
      return {
        ...state,
        isSendingTaskRequest: action.data
      };
    case SET_TASK_REQUEST_ERROR:
      return {
        ...state,
        taskRequestError: action.data
      };
    case CLEAR_TASK_REQUEST_ERROR:
      return {
        ...state,
        taskRequestError: ""
      };
    case SET_TASK_REQUEST_SUCCESS:
      return {
        ...state,
        taskRequestSuccess: action.data
      };
    case CLEAR_TASK_REQUEST_SUCCESS:
      return {
        ...state,
        taskRequestSuccess: ""
      };
    case CLEAR_TASKS_PAGINATION:
      return {
        ...state,
        tasksPagination: {}
      };
    case SET_TASKS:
      count = action.data.count;
      next = action.data.next;
      previous = action.data.previous;
      results = action.data.results;
      tasksPagination = { count, next, previous };
      tasks = {};
      tasksOrdering = [];
      for (let task of results) {
        tasks[task.id] = task;
        tasksOrdering.push(task.id);
      }
      return { ...state, tasks, tasksOrdering, tasksPagination };
    case ADD_TASKS:
      count = action.data.count;
      next = action.data.next;
      previous = action.data.previous;
      results = action.data.results;
      tasksPagination = { count, next, previous };
      tasks = { ...state.tasks };
      tasksOrdering = [...state.tasksOrdering];
      for (let task of results) {
        tasks[task.id] = task;
        tasksOrdering.push(task.id);
      }
      return { ...state, tasks, tasksOrdering, tasksPagination };
    case ADD_TASK:
      task = action.data;
      tasks = { ...state.tasks };
      tasksOrdering = [...state.tasksOrdering];
      tasks[task.id] = task;
      tasksOrdering.unshift(task.id);
      return { ...state, tasks, tasksOrdering };
    case SET_TASK_ID:
      return {
        ...state,
        currentTaskID: action.data
      };
    case SET_TASK_USER_ID:
      return {
        ...state,
        userID: action.data
      };
    case SET_TASK_NAME:
      return {
        ...state,
        name: action.data
      };
    case SET_TASK_TIME_DIFFICULTY:
      return {
        ...state,
        timeDifficulty: action.data
      };
    case SET_TASK_ENERGY_DIFFICULTY:
      return {
        ...state,
        energyDifficulty: action.data
      };
    case SET_TASK_FOCUS_DIFFICULTY:
      return {
        ...state,
        focusDifficulty: action.data
      };
    case SET_TASK_ADDITIONAL_INFO:
      return {
        ...state,
        additionalInfo: action.data
      };
    case SET_TASK_COMPLETED_INFO:
      return {
        ...state,
        completedInfo: action.data
      };
    case SET_TASK_GOAL_IDS:
      return {
        ...state,
        goalIDs: action.data
      };
    default:
      return state;
  }
}

export default tasksReducer;
