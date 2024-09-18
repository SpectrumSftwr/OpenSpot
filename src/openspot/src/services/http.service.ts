import axios from 'axios'; 
import { BASE_URL } from '../constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 5000;

export default {
  get: axios.get, 
  post: axios.post, 
  put: axios.put, 
  delete: axios.delete, 
}




