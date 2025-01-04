import axios from 'axios';
import { api } from './api';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: api,
  // timeout: 10000, // Tiempo de espera
  withCredentials: true, // Asegúrate de enviar credenciales (cookies)
});  


// Interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
