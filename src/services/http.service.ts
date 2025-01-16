import axios, { InternalAxiosRequestConfig } from 'axios'; 
import { BASE_URL } from '../constants';
import { getSession, isActiveSession } from './session.service';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 5000;

axios.interceptors
.request.use((config: InternalAxiosRequestConfig<any>) : InternalAxiosRequestConfig<any> => {

  if (isActiveSession()) { 
    let sessionJwt = getSession();
    if (sessionJwt) {
      config.headers['Authorization'] = `Bearer ${sessionJwt}`;
    }
  }

  return config;
},(error) => {
  return Promise.reject(error)

});

export default {
  get: axios.get, 
  post: axios.post, 
  put: axios.put, 
  delete: axios.delete, 
}




