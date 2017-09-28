import { CREATE_TASK_ACTION_REQUEST } from "./constants";

export function createTaskActionRequest(postBody) {
  return { type: CREATE_TASK_ACTION_REQUEST, data: postBody };
}
