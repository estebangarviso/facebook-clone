import { AppConfig } from '../app/config';
import axios from 'axios';

const ENDPOINT = AppConfig.BACKEND_URL + '/post';

const getAll = () => {
  return axios
    .get(ENDPOINT, {
      credentials: 'include'
    })
    .then(async (response) => {
      console.log(response);
      const json = await response.data;
      if (json.success) {
        return json.data;
      }
      throw new Error(json.message);
    })
    .catch((error) => {
      console.error(error);
    });
};

const add = (data) => {
  return axios
    .post(ENDPOINT, data, {
      credentials: 'include'
    })
    .then(async (response) => {
      const json = await response.data;
      if (json.success) {
        return json.data;
      }
      throw new Error(json.message);
    })
    .catch((error) => {
      console.error(error);
    });
};

const PostService = {
  getAll,
  add
};

export default PostService;
