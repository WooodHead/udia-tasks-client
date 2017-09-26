import { ADD_APP_MESSAGE, DELETE_APP_MESSAGE } from "./constants";

export function addAppMessage(message) {
  return { type: ADD_APP_MESSAGE, data: message };
}

export function deleteAppMessage(index) {
  return { type: DELETE_APP_MESSAGE, data: index };
}
