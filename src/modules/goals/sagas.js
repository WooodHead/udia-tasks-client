import { effects } from "redux-saga";
import {
  isSendingGoalRequest,
  setGoalRequestError,
  clearGoalRequestError,
  setGoalRequestSuccess,
  clearGoalRequestSuccess
} from "./reducer.actions";
import { createGoal, getGoal, getGoals, updateGoal, deleteGoal } from "./api";

function* createGoalCall(postBody) {
  yield effects.put(isSendingGoalRequest(true));
  const { user, name, tag, additional_info } = postBody;
  try {
    return yield effects.call(createGoal, user, name, tag, additional_info);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

function* getGoalCall(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { id, params } = payload;
  try {
    return yield effects.call(getGoal, id, params);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

function* getGoalsCall(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { params } = payload;
  try {
    return yield effects.call(getGoals, params);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

function* updateGoal(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { id, user, name, tag, additional_info } = payload;
  try {
    return yield effects.call(updateGoal, id, user, name, tag, additional_info);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

function* deleteGoal(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { id } = payload;
  try {
    return yield effects.call(deleteGoal, id);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}
