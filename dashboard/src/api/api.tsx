import axios from 'axios';
//import constants from '../config/constants';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export default api;