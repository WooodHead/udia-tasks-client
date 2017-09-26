import { effects } from "redux-saga";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RETRIEVE_SELF_USER_REQUEST
} from "./auth/constants";
import {
  loginFlow,
  logoutFlow,
  registerFlow,
  verifyEmailFlow,
  changePasswordFlow,
  forgotPasswordFlow,
  resetPasswordFlow,
  retrieveSelfUserFlow
} from "./auth/sagas";
import {
  CREATE_GOAL_REQUEST,
  GET_GOALS_REQUEST,
  GET_GOAL_REQUEST,
  UPDATE_GOAL_REQUEST
} from "./goals/constants";
import {
  createGoalFlow,
  getGoalsFlow,
  getGoalFlow,
  updateGoalFlow
} from "./goals/sagas";
import { CREATE_TASK_REQUEST } from "./tasks/constants";
import { createTaskFlow } from "./tasks/sagas";

export default function* rootSaga() {
  // Authentication related sagas
  yield effects.takeLatest(LOGIN_REQUEST, loginFlow);
  yield effects.takeLatest(LOGOUT_REQUEST, logoutFlow);
  yield effects.takeLatest(REGISTER_REQUEST, registerFlow);
  yield effects.takeLatest(EMAIL_VERIFICATION_REQUEST, verifyEmailFlow);
  yield effects.takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordFlow);
  yield effects.takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordFlow);
  yield effects.takeLatest(RESET_PASSWORD_REQUEST, resetPasswordFlow);
  yield effects.takeLatest(RETRIEVE_SELF_USER_REQUEST, retrieveSelfUserFlow);
  // Goals related sagas
  yield effects.takeLatest(CREATE_GOAL_REQUEST, createGoalFlow);
  yield effects.takeLatest(GET_GOALS_REQUEST, getGoalsFlow);
  yield effects.takeLatest(GET_GOAL_REQUEST, getGoalFlow);
  yield effects.takeLatest(UPDATE_GOAL_REQUEST, updateGoalFlow);
  // Tasks related sagas
  yield effects.takeLatest(CREATE_TASK_REQUEST, createTaskFlow);
}
