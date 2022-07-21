import axios, { handleError, handleSuccess } from '../utils/axios';

const ENDPOINT = '/user';

async function login(formData) {
  try {
    const res = await axios.post(ENDPOINT + '/login', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function register(formData) {
  try {
    const res = await axios.post(ENDPOINT + '/register', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function logout() {
  try {
    const res = await axios.post(ENDPOINT + '/logout');
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

async function refresh() {
  try {
    const res = await axios.post(ENDPOINT + '/refresh');
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

const AuthService = {
  login,
  register,
  logout,
  refresh
};

export default AuthService;
