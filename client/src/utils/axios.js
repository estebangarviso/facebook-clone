// ref: https://axios-http.com/docs/config_defaults
import axios from 'axios';
import { AppConfig } from '../app/config';

axios.defaults.baseURL = AppConfig.BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export async function handleSuccess(res) {
  const response = await res;
  console.log(`Response on method`, response);
  return response;
}

export function handleError(err) {
  console.error(`Error on method`, err);
  return err.response;
}

export default axios;
