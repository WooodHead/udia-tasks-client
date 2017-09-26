import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import goalsReducer from "./goals/reducer";
import tasksReducer from "./tasks/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
  tasks: tasksReducer
});

export default rootReducer;
