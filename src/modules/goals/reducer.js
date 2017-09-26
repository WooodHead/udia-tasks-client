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
  SET_GOAL_ID,
  SET_GOAL_USER_ID,
  SET_GOAL_NAME,
  SET_GOAL_TAG,
  SET_GOAL_ADDITIONAL_INFO
} from "./constants";

const initialState = {
  isSendingGoalRequest: false,
  goalRequestError: "",
  goalRequestSuccess: "",
  goals: {}, // hold all goals in an object, key is ID
  goalsOrdering: [], // hold ordering of goal ids in array
  goalsPagination: {}, // hold pagination state for goals
  currentGoalID: 0, // hold current goal ID (detail view)
  userID: 0,
  name: "",
  tag: "",
  additionalInfo: {}
};

function goalsReducer(state = initialState, action) {
  let count = 0;
  let next = null;
  let previous = null;
  let results = [];
  let goalsPagination = { count, next, previous };
  let goals = {};
  let goalsOrdering = [];
  let goal = {};

  switch (action.type) {
    case IS_SENDING_GOAL_REQUEST:
      return {
        ...state,
        isSendingGoalRequest: action.data
      };
    case SET_GOAL_REQUEST_ERROR:
      return {
        ...state,
        goalRequestError: action.data
      };
    case CLEAR_GOAL_REQUEST_ERROR:
      return {
        ...state,
        goalRequestError: ""
      };
    case SET_GOAL_REQUEST_SUCCESS:
      return {
        ...state,
        goalRequestSuccess: action.data
      };
    case CLEAR_GOAL_REQUEST_SUCCESS:
      return {
        ...state,
        goalRequestSuccess: ""
      };
    case CLEAR_GOALS_PAGINATION:
      return {
        ...state,
        goalsPagination: {}
      };
    case SET_GOALS:
      count = action.data.count;
      next = action.data.next;
      previous = action.data.previous;
      results = action.data.results;
      goalsPagination = { count, next, previous };
      goals = {};
      goalsOrdering = [];
      for (let goal of results) {
        goals[goal.id] = goal;
        goalsOrdering.push(goal.id);
      }
      return { ...state, goals, goalsOrdering, goalsPagination };
    case ADD_GOALS:
      count = action.data.count;
      next = action.data.next;
      previous = action.data.previous;
      results = action.data.results;
      goalsPagination = { count, next, previous };
      goals = { ...state.goals };
      goalsOrdering = [...state.goalsOrdering];
      for (let goal of results) {
        goals[goal.id] = goal;
        goalsOrdering.push(goal.id);
      }
      return { ...state, goals, goalsOrdering, goalsPagination };
    case ADD_GOAL:
      goal = action.data;
      goals = { ...state.goals };
      goalsOrdering = [...state.goalsOrdering];
      goals[goal.id] = goal;
      goalsOrdering.unshift(goal.id);
      return { ...state, goals, goalsOrdering };
    case SET_GOAL_ID:
      return {
        ...state,
        currentGoalID: action.data
      };
    case SET_GOAL_USER_ID:
      return {
        ...state,
        userID: action.data
      };
    case SET_GOAL_NAME:
      return {
        ...state,
        name: action.data
      };
    case SET_GOAL_TAG:
      return {
        ...state,
        tag: action.data
      };
    case SET_GOAL_ADDITIONAL_INFO:
      return {
        ...state,
        additionalInfo: action.data
      };
    default:
      return state;
  }
}

export default goalsReducer;
