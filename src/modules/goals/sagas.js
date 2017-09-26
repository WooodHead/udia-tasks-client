import qs from "qs";
import { effects } from "redux-saga";
import {
  isSendingGoalRequest,
  setGoalRequestError,
  clearGoalRequestError,
  setGoalRequestSuccess,
  clearGoalRequestSuccess,
  addGoals,
  addGoal,
  setGoals,
  setGoalID,
  setGoalName,
  setGoalTag,
  setGoalAdditionalInfo
} from "./reducer.actions";
import { getGoalsRequest } from "./sagas.actions";
import { createGoal, getGoal, getGoals, updateGoal, deleteGoal } from "./api";

function* createGoalCall(postBody) {
  yield effects.put(isSendingGoalRequest(true));
  const { user, name, tag, additional_info } = postBody;
  try {
    return yield effects.call(createGoal, user, name, tag, additional_info);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
    return false;
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
    return false;
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

export function* getGoalFlow(request) {
  yield effects.put(clearGoalRequestError());
  yield effects.put(clearGoalRequestSuccess());
  const wasSuccessful = yield effects.call(getGoalCall, request.data);
  if (wasSuccessful) {
    yield effects.put(addGoal(wasSuccessful));
    yield effects.put(setGoalRequestSuccess(wasSuccessful));
    yield effects.put(clearGoalRequestError());
  }
}

function* getGoalsCall(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { params } = payload;
  try {
    return yield effects.call(getGoals, params);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

/**
 * Currently this will get all of the goals for the given user on initial call
 * @param {object} request - GET_GOALS_REQUEST action
 * @param {object} request.data - data component of action
 * @param {object} request.data.params - Request GET query parameters
 * @param {number} request.data.params.page - The page for pagination to get
 */
export function* getGoalsFlow(request) {
  yield effects.put(clearGoalRequestError());
  yield effects.put(clearGoalRequestSuccess());
  const { params } = request.data;
  const wasSuccessful = yield effects.call(getGoalsCall, request.data);
  if (wasSuccessful) {
    if (!params) {
      yield effects.put(setGoals(wasSuccessful));
    } else {
      yield effects.put(addGoals(wasSuccessful));
    }
    yield effects.put(setGoalRequestSuccess(wasSuccessful));
    yield effects.put(clearGoalRequestError());
    if (wasSuccessful.next) {
      const params = qs.parse(wasSuccessful.next.split("?").pop());
      yield effects.put(getGoalsRequest({ params }));
    }
  }
}

function* updateGoalCall(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { id, user, name, tag, additional_info } = payload;
  try {
    return yield effects.call(updateGoal, id, user, name, tag, additional_info);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}

export function* updateGoalFlow(request) {
  yield effects.put(clearGoalRequestError());
  yield effects.put(clearGoalRequestSuccess());
  const wasSuccessful = yield effects.call(updateGoalCall, request.data);
  if (wasSuccessful) {
    yield effects.put(addGoal(wasSuccessful));
    yield effects.put(setGoalRequestSuccess(wasSuccessful));
    yield effects.put(clearGoalRequestError());
  }
}

function* deleteGoalCall(payload) {
  yield effects.put(isSendingGoalRequest(true));
  const { id } = payload;
  try {
    return yield effects.call(deleteGoal, id);
  } catch (exception) {
    yield effects.put(setGoalRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingGoalRequest(false));
  }
}
