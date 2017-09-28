import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import goalsReducer from "./goals/reducer";
import messagesReducer from "./messages/reducer";
import taskActionsReducer from "./taskActions/reducer";
import tasksReducer from "./tasks/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
  messages: messagesReducer,
  taskActionsReducer: taskActionsReducer,
  tasks: tasksReducer
});

export default rootReducer;
