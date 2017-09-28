import { post } from "../baseApi";

/**
 * Function wrapping POST request for creating task actions
 * @param {number} task - id of task
 * @param {number} action - action type id to persist (something between 1-5)
 * @param {string} initiated - timestamp, eg "2017-09-28T17:59:28.047314Z"
 */
export function createTaskAction(task, action, initiated) {
  return post("/task_actions/", {
    task,
    action,
    initiated
  }).then(resp => Promise.resolve(resp));
}
