import axios from "axios";
export const API_URL = "http://127.0.0.1:5002";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Content-Encoding": "gzip",
    "Access-Control-Allow-Origin": true,
  },
});

/**
 * Http GET.
 *
 * @param {string} url
 * @param {Object} params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  const request = {
    method: "get",
    url: url,
    params: params,
  };
  return http(request);
}
/**
 * Http POST.
 *
 * @param {string} url
 * @param {Object} data
 * @returns  {Promise}
 */
export function post(url, data = {}) {
  const request = {
    method: "post",
    url: url,
    data: data,
  };

  return http(request);
}

/**
 * Http PUT.
 *
 * @param {string} url
 * @param {Object} data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  const request = {
    method: "put",
    url: url,
    data: data,
  };
  return http(request);
}

/**
 * Http DELETE.
 *
 * @param {string} url
 * @param {Object} data
 * @returns {Promise}
 */
export function remove(url, data = {}) {
  const request = {
    method: "delete",
    data,
    url,
  };
  return http(request);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  put,
  remove,
};
