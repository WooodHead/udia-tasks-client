import { effects } from "redux-saga";
import {
  isSendingGoalRequest,
  setGoalRequestError,
  clearGoalRequestError,
  setGoalRequestSuccess,
  clearGoalRequestSuccess,
  addGoals,
  addGoal,
  setGoalID,
  setGoalName,
  setGoalTag,
  setGoalAdditionalInfo
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

export function* createGoalFlow(request) {
  yield effects.put(clearGoalRequestError());
  yield effects.put(clearGoalRequestSuccess());
  const wasSuccessful = yield effects.call(createGoalCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setGoalRequestSuccess(wasSuccessful));
    yield effects.put(clearGoalRequestError());
    yield effects.put(addGoal(wasSuccessful));
    yield effects.put(setGoalID(0));
    yield effects.put(setGoalName(""));
    yield effects.put(setGoalTag(""));
    yield effects.put(setGoalAdditionalInfo({}));
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

function* updateGoalCall(payload) {
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

function* deleteGoalCall(payload) {
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
