import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const getAll = () => {
  return axios.get(API_URL + '/posts', { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `/posts/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL + '/posts', data, { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(API_URL + `/posts/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return axios.delete(API_URL + `/posts/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(API_URL + `/posts`, { headers: authHeader() });
};

const findByTitle = (title) => {
  return axios.get(API_URL + `/posts?title=${title}`, {
    headers: authHeader(),
  });
};

const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default PostService;
