import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import goalsReducer from "./goals/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
});

export default rootReducer;
