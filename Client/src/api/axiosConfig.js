import axios from 'axios';
import { api } from './api';


// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: api,
  timeout: 10000, // Tiempo de espera
  withCredentials: true, // Asegúrate de enviar credenciales (cookies)
});

// Interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    //TODO
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Procesar la respuesta aquí si es necesario
    return response;
  },
  (error) => {
    // Manejo de errores de respuesta
    return Promise.reject(error);
  }
);

export default axiosInstance;
