import { AppConfig } from '../app/config';
import axios from 'axios';

const ENDPOINT = AppConfig.BACKEND_URL + '/post';

const getAll = () => {
  return axios
    .get(ENDPOINT, {
      withCredentials: true
    })
    .then(async (res) => {
      const json = await res.data;
      if (json.success) {
        return json;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const add = (data) => {
  return axios
    .post(ENDPOINT, data, {
      withCredentials: true
    })
    .then(async (res) => {
      console.log({ res });
      const json = await res.data;
      if (json.success) {
        return json.data;
      }
      throw new Error(json.message);
    })
    .catch((err) => {
      console.error(err);
    });
};

const PostService = {
  getAll,
  add
};

export default PostService;
