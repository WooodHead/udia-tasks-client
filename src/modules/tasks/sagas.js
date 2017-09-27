import qs from "qs";
import { effects } from "redux-saga";
import {
  isSendingTaskRequest,
  setTaskRequestError,
  clearTaskRequestError,
  setTaskRequestSuccess,
  clearTaskRequestSuccess,
  setTasks,
  addTasks,
  addTask,
  removeTask,
  setTaskID,
  setTaskName,
  setTaskTimeDifficulty,
  setTaskEnergyDifficulty,
  setTaskFocusDifficulty,
  setTaskGoalIDs,
  setTaskAdditionalInfo
} from "./reducer.actions";
import { getTasksRequest } from "./sagas.actions";
import { createTask, getTask, getTasks, updateTask, deleteTask } from "./api";

function* createTaskCall(postBody) {
  yield effects.put(isSendingTaskRequest(true));
  const {
    user,
    name,
    additional_info,
    time_difficulty,
    energy_difficulty,
    focus_difficulty,
    completed_info,
    goal_ids
  } = postBody;
  try {
    return yield effects.call(
      createTask,
      user,
      name,
      additional_info,
      time_difficulty,
      energy_difficulty,
      focus_difficulty,
      completed_info,
      goal_ids
    );
  } catch (exception) {
    yield effects.put(setTaskRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingTaskRequest(false));
  }
}

export function* createTaskFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const wasSuccessful = yield effects.call(createTaskCall, request.data);
  if (wasSuccessful) {
    yield effects.put(setTaskRequestSuccess(wasSuccessful));
    yield effects.put(clearTaskRequestError());
    yield effects.put(setTaskName(""));
    yield effects.put(setTaskTimeDifficulty(1));
    yield effects.put(setTaskEnergyDifficulty(2));
    yield effects.put(setTaskFocusDifficulty(3));
    yield effects.put(setTaskGoalIDs([]));
    yield effects.put(setTaskAdditionalInfo({}));
    yield effects.put(addTask(wasSuccessful));
  }
}

function* getTasksCall(payload) {
  yield effects.put(isSendingTaskRequest(true));
  const { params } = payload;
  try {
    return yield effects.call(getTasks, params);
  } catch (exception) {
    yield effects.put(setTaskRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingTaskRequest(false));
  }
}

/**
 * Currently, this will get all of the tasks for the given user on initial call
 * @param {object} request - GET_TASKS_REQUEST action
 * @param {object} request.data - data component of action
 * @param {object} request.data.params - Request GET query parameters
 * @param {number} request.data.params.page - the page for pagination to get 
 */
export function* getTasksFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const { params } = request.data;
  const wasSuccessful = yield effects.call(getTasksCall, request.data);
  if (wasSuccessful) {
    if (!params) {
      yield effects.put(setTasks(wasSuccessful));
    } else {
      yield effects.put(addTasks(wasSuccessful));
    }
    yield effects.put(setTaskRequestSuccess(wasSuccessful));
    yield effects.put(clearTaskRequestError());
    if (wasSuccessful.next) {
      const params = qs.parse(wasSuccessful.next.split("?").pop());
      yield effects.put(getTasksRequest({ params }));
    }
  }
}

function* getTaskCall(payload) {
  yield effects.put(isSendingTaskRequest(true));
  const { id, params } = payload;
  try {
    return yield effects.call(getTask, id, params);
  } catch (exception) {
    yield effects.put(setTaskRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingTaskRequest(false));
  }
}

export function* getTaskFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const wasSuccessful = yield effects.call(getTaskCall, request.data);
  if (wasSuccessful) {
    yield effects.put(addTask(wasSuccessful));
    yield effects.put(setTaskRequestSuccess(wasSuccessful));
    yield effects.put(clearTaskRequestError());
  }
}

export function* getEditableTaskFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const wasSuccessful = yield effects.call(getTaskCall, request.data);
  if (wasSuccessful) {
    yield effects.put(clearTaskRequestError());
    yield effects.put(addTask(wasSuccessful));
    // do not set request success for editing tasks, simply populate the fields
    yield effects.put(setTaskName(wasSuccessful.name));
    yield effects.put(setTaskTimeDifficulty(wasSuccessful.time_difficulty));
    yield effects.put(setTaskEnergyDifficulty(wasSuccessful.energy_difficulty));
    yield effects.put(setTaskFocusDifficulty(wasSuccessful.focus_difficulty));
    yield effects.put(
      setTaskGoalIDs(wasSuccessful.goal_ids.map(val => `${val}`))
    );
    yield effects.put(setTaskAdditionalInfo(wasSuccessful.additional_info));
    yield effects.put(setTaskID(wasSuccessful.id));
  }
}

function* updateTaskCall(payload) {
  yield effects.put(isSendingTaskRequest(true));
  const {
    id,
    user,
    name,
    additional_info,
    time_difficulty,
    energy_difficulty,
    focus_difficulty,
    completed_info,
    goal_ids
  } = payload;
  try {
    return yield effects.call(
      updateTask,
      id,
      user,
      name,
      additional_info,
      time_difficulty,
      energy_difficulty,
      focus_difficulty,
      completed_info,
      goal_ids
    );
  } catch (exception) {
    yield effects.put(setTaskRequestError(exception));
  } finally {
    yield effects.put(isSendingTaskRequest(false));
  }
}

export function* updateTaskFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const wasSuccessful = yield effects.call(updateTaskCall, request.data);
  if (wasSuccessful) {
    yield effects.put(addTask(wasSuccessful));
    yield effects.put(setTaskRequestSuccess(wasSuccessful));
    yield effects.put(clearTaskRequestError());
  }
}

function* deleteTaskCall(payload) {
  yield effects.put(isSendingTaskRequest(true));
  const { id } = payload;
  try {
    yield effects.call(deleteTask, id);
    return true;
  } catch (exception) {
    yield effects.put(setTaskRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingTaskRequest(false));
  }
}

export function* deleteTaskFlow(request) {
  yield effects.put(clearTaskRequestError());
  yield effects.put(clearTaskRequestSuccess());
  const { id } = request.data;
  const wasSuccessful = yield effects.call(deleteTaskCall, request.data);
  if (wasSuccessful) {
    yield effects.put(removeTask(id));
    yield effects.put(setTaskRequestSuccess(wasSuccessful));
    yield effects.put(clearTaskRequestError());
  }
}
