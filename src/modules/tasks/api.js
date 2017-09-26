import { get, post, put, del } from "../baseApi";

/**
 * Function wrapping GET request for getting tasks
 * @param {object} params - GET request url parameters
 */
export function getTasks(params) {
  return get("/tasks/", params).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping GET request for getting a single task
 * @param {number} id - ID of task to get
 * @param {object} params - GET request url parameters
 */
export function getTask(id, params) {
  return get(`/tasks/${id}/`, params).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for creating a task
 * @param {number} user - User ID
 * @param {string} name - Name of task to set
 * @param {object} additional_info - JSON object with additional task info
 * @param {number} time_difficulty - Difficulty of task (terms of time)
 * @param {number} energy_difficulty - Difficulty of task (terms of energy)
 * @param {number} focus_difficulty - Difficulty of task (terms of focus)
 * @param {object} completed_info - JSON object with completed info
 * @param {number[]} goal_ids - Array of goal IDs associated with task
 */
export function createTask(
  user,
  name,
  additional_info,
  time_difficulty,
  energy_difficulty,
  focus_difficulty,
  completed_info,
  goal_ids
) {
  return post("/tasks/", {
    user,
    name,
    additional_info,
    time_difficulty,
    energy_difficulty,
    focus_difficulty,
    completed_info,
    goal_ids
  }).then(resp => Promise.resolve(resp));
}
/**
 * Function wrapping PUT request for updating a task
 * @param {number} id - Task ID
 * @param {number} user - User ID
 * @param {string} name - Name of task to update
 * @param {object} additional_info - JSON object with additional task info
 * @param {number} time_difficulty - Difficulty of task (terms of time)
 * @param {number} energy_difficulty - Difficulty of task (terms of energy)
 * @param {number} focus_difficulty - Difficulty of task (terms of focus)
 * @param {object} completed_info - JSON object with completed info
 * @param {number[]} goal_ids - Array of goal IDs associated with task
 */
export function updateTask(
  id,
  user,
  name,
  additional_info,
  time_difficulty,
  energy_difficulty,
  focus_difficulty,
  completed_info,
  goal_ids
) {
  return put(`/tasks/${id}/`, {
    user,
    name,
    additional_info,
    time_difficulty,
    energy_difficulty,
    focus_difficulty,
    completed_info,
    goal_ids
  });
}

/**
 * Function wrapping DELETE request for deleting a task
 * @param {number} id - Task ID
 */
export function deleteTask(id) {
  return del(`/tasks/${id}/`).then(resp => Promise.resolve(resp));
}
