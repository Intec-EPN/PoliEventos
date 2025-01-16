import axios from 'axios';
import { api } from './api';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: api,
});

// Interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
