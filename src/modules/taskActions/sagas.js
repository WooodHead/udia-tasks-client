import { effects } from "redux-saga";
import { createTaskAction } from "./api";
import { ACTION_TYPE } from "./constants";
import {
  isSendingTaskActionRequest,
  setTaskActionRequestError,
  clearTaskActionRequestError,
  setTaskActionRequestSuccess,
  clearTaskActionRequestSuccess
} from "./reducer.actions";
import { getTaskRequest } from "../tasks/sagas.actions";
import { addAppMessage } from "../messages/reducer.actions";

function* createTaskActionCall(postBody) {
  yield effects.put(isSendingTaskActionRequest(true));
  const { task, action, initiated } = postBody;
  try {
    return yield effects.call(createTaskAction, task, action, initiated);
  } catch (exception) {
    yield effects.put(setTaskActionRequestError(exception));
    return false;
  } finally {
    yield effects.put(isSendingTaskActionRequest(false));
  }
}

export function* createTaskActionFlow(request) {
  yield effects.put(clearTaskActionRequestError());
  yield effects.put(clearTaskActionRequestSuccess());
  const wasSuccessful = yield effects.call(createTaskActionCall, request.data);
  if (wasSuccessful) {
    yield effects.put(clearTaskActionRequestError());
    yield effects.put(setTaskActionRequestSuccess(wasSuccessful));
    const actionType = ACTION_TYPE[wasSuccessful.action];
    yield effects.put(
      addAppMessage({
        context: "success",
        header: "Task Action",
        content: `Task ${actionType}!`
      })
    );
    yield effects.put(getTaskRequest({ id: wasSuccessful.task }));
  }
}
