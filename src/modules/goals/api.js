import { get, post, put, del } from "../baseApi";

/**
 * Function wrapping GET request for getting goals
 * @param {object} params - GET request url parameters
 */
export function getGoals(params) {
  return get("/goals/", params).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping GET request for getting a single goal
 * @param {number} id - ID of goal to get
 * @param {object} params - GET request url parameters
 */
export function getGoal(id, params) {
  return get(`/goals/${id}/`, params).then(resp => Promise.resolve(resp));
}

/**
 * Function wrapping POST request for creating a goal
 * @param {number} user - User ID
 * @param {string} name - Name of the goal to set
 * @param {string} tag - Shorthand reference to the goal
 * @param {object} additional_info - JSON object containing additional info
 */
export function createGoal(user, name, tag, additional_info) {
  return post("/goals/", { user, name, tag, additional_info }).then(resp =>
    Promise.resolve(resp)
  );
}

/**
 * Function wrapping PUT request for updating a goal
 * @param {number} id - ID of goal to update
 * @param {object} user - User object
 * @param {string} name - Updated goal name
 * @param {string} tag - Update goal tag shorthand
 * @param {object} additional_info - updated  additional info JSON object
 */
export function updateGoal(id, user, name, tag, additional_info) {
  return put(`/goals/${id}/`, { user, name, tag, additional_info }).then(resp =>
    Promise.resolve(resp)
  );
}

/**
 * Function wrapping DELETE request for deleting a goal
 * @param {number} id - ID of goal to delete
 */
export function deleteGoal(id) {
  return del(`/goals/${id}/`).then(resp => Promise.resolve(resp));
}
