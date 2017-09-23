import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const localStorage = global.process && process.env.NODE_ENV === "test"
  ? //eslint-disable-next-line import/no-extraneous-dependencies
    require("localStorage")
  : global.window.localStorage;

function headers() {
  const token = localStorage.getItem("udiaUserToken") || "";
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (token) {
    header["Authorization"] = `Token ${token}`;
  }
  return header;
}

const apiInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: process.env.REACT_APP_API_TIMEOUT
});

export function get(url, params = {}) {
  return apiInstance
    .get(url, { params, headers: headers() })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export function post(url, data) {
  return apiInstance
    .post(url, data, { headers: headers() })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export function put(url, data) {
  return apiInstance
    .put(url, data, { headers: headers() })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export function patch(url, data) {
  return apiInstance
    .patch(url, data, { headers: headers() })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export function del(url) {
  return apiInstance
    .delete(url, { headers: headers() })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}
