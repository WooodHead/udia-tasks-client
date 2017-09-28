import {
  IS_SENDING_TASK_ACTION_REQUEST,
  SET_TASK_ACTION_REQUEST_ERROR,
  CLEAR_TASK_ACTION_REQUEST_ERROR,
  SET_TASK_ACTION_REQUEST_SUCCESS,
  CLEAR_TASK_ACTION_REQUEST_SUCCESS
} from "./constants";

const initialState = {
  isSendingTaskActionRequest: false,
  taskActionRequestError: "",
  taskActionRequestSuccess: ""
};

function taskActionsReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SENDING_TASK_ACTION_REQUEST:
      return {
        ...state,
        isSendingTaskActionRequest: action.data
      };
    case SET_TASK_ACTION_REQUEST_ERROR:
      return {
        ...state,
        setTaskActionRequestError: action.data
      };
    case CLEAR_TASK_ACTION_REQUEST_ERROR:
      return {
        ...state,
        setTaskActionRequestError: ""
      };
    case SET_TASK_ACTION_REQUEST_SUCCESS:
      return {
        ...state,
        setTaskActionRequestSuccess: action.data
      };
    case CLEAR_TASK_ACTION_REQUEST_SUCCESS:
      return {
        ...state,
        setTaskActionRequestSuccess: ""
      };
    default:
      return state;
  }
}

export default taskActionsReducer;
