import { effects } from "redux-saga";
import {
  isSendingTaskRequest,
  setTaskRequestError,
  clearTaskRequestError,
  setTaskRequestSuccess,
  clearTaskRequestSuccess,
  setTaskName,
  setTaskTimeDifficulty,
  setTaskEnergyDifficulty,
  setTaskFocusDifficulty,
  setTaskGoalIDs,
  setTaskAdditionalInfo,
  addTask
} from "./reducer.actions";
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
