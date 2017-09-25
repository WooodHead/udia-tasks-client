/**
 * Given an exception, return the error body or HTTP status/status text string.
 * @param {object|string} exception - axios thrown exception
 */
export function parseError(exception) {
  let response = exception.response || {};
  let data = response.data;
  let err = exception.toString();
  if (response.status) {
    err = `${response.status} ${response.statusText}`;
  }
  console.error(exception)
  return data || err;
}
