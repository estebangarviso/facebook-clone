import { AppConfig } from '../app/config';
import axios from 'axios';

const ENDPOINT = AppConfig.BACKEND_URL + '/user';

const login = (data) => {
  return axios
    .post(ENDPOINT + '/login', { ...data })
    .then(async (res) => {
      const json = await res.data;
      if (json.success) {
        return json;
      } else {
        throw new Error(json.message);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const register = (data) => {
  return axios
    .post(ENDPOINT + '/register', data)
    .then(async (res) => {
      const json = await res.data;
      if (json.success) {
        return json.data;
      } else {
        throw new Error(json.message);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const logout = () => {
  return axios
    .post(ENDPOINT + '/logout', {
      withCredentials: true
    })
    .then(async (res) => {
      const json = await res.data;
      if (json.success) {
        return json.data;
      } else {
        throw new Error(json.message);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const refresh = () => {
  return axios
    .post(ENDPOINT + '/refresh', {
      withCredentials: true
    })
    .then(async (res) => {
      const json = await res.data;
      if (json.success) {
        return json.data;
      } else {
        throw new Error(json.message);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const AuthService = {
  login,
  register,
  logout,
  refresh
};

export default AuthService;
