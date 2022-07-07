import { AppConfig } from '../app/config';
import axios from 'axios';

const ENDPOINT = AppConfig.BACKEND_URL + '/user';

const login = (email, password) => {
  return axios
    .post(ENDPOINT + '/login', {
      email,
      password
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

const register = (data) => {
  return axios
    .post(ENDPOINT + '/register', data)
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

const logout = () => {
  return axios
    .post(ENDPOINT + '/logout', {
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

const refresh = () => {
  return axios
    .post(ENDPOINT + '/refresh', {
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

const AuthService = {
  login,
  register,
  logout,
  refresh
};

export default AuthService;
