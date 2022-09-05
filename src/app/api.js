import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getPost() {
  const response = axios.get(`${apiURL}/posts`);

  return response;
}

function getCreatePost({ title, content, date }) {
  const response = axios.post(`${apiURL}/posts`, {
    title,
    content,
    date ,
  });

  return response;
}

function getUpdatePost(id, post) {
  const response = axios.put(`${apiURL}/posts/${id}`, {
    id: id,
    title: post.content,
    date: post.date,
    content: post.content
  });

  return response;
}

function getDeletedPost(id) {
  const response = axios.delete(`${apiURL}/posts/${id}`);

  return response;
}

export { getPost, getCreatePost, getUpdatePost, getDeletedPost };
