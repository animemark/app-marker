
export async function discuss_loadList(data) {
  return fetch(`https://bato.to/api/discuss/loadList`, {
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
  return fetch(`https://bato.to/api/discuss/createPost`, {
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
  return fetch(`https://bato.to/api/discuss/votePost`, {
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
  discuss_loadList,
  discuss_createPost,
  discuss_votePost,
};
export default networks;