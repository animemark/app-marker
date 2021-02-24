import axios from 'axios';

const api_end_point = `https://app-marker.${document.domain}`;

/**
 * One for All
 * @param {*} path /api/marking/myMark /api/discuss/LoadList
 * @param {*} data data to post
 * @param {*} opts 
 */
export async function app_marker_api(path, data = null, opts = {}) {
  const url = `${api_end_point}${path}`;
  const config = Object.assign({
    url,
    data,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }, opts);
  return axios(config);
}

// ================
// #TODO: the rest funcs can be changed to app_marker_api
// ================

// ================
// marking
// ================
export async function marking_myMark(data) {
  return fetch(`${api_end_point}/api/marking/myMark`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function marking_loadList(data) {
  return fetch(`${api_end_point}/api/marking/loadList`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function marking_upsertMark(data) {
  return fetch(`${api_end_point}/api/marking/upsertMark`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function marking_deleteMark(data) {
  return fetch(`${api_end_point}/api/marking/deleteMark`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function marking_voteMark(data) {
  return fetch(`${api_end_point}/api/marking/voteMark`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}



// ================
// discuss
// ================
export async function discuss_loadList(data) {
  return fetch(`${api_end_point}/api/discuss/loadList`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function discuss_createPost(data) {
  return fetch(`${api_end_point}/api/discuss/createPost`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export async function discuss_votePost(data) {
  return fetch(`${api_end_point}/api/discuss/votePost`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}


const networks = {
  app_marker_api,

  marking_myMark,
  marking_loadList,
  marking_upsertMark,
  marking_voteMark,

  discuss_loadList,
  discuss_createPost,
  discuss_votePost,
};
export default networks;