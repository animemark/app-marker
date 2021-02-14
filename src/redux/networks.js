const api_end_point = `https://app-marker.bato.to`;


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
  marking_myMark,
  marking_loadList,
  marking_upsertMark,
  marking_voteMark,

  discuss_loadList,
  discuss_createPost,
  discuss_votePost,
};
export default networks;