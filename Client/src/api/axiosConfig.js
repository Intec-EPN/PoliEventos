import axios from 'axios';
import { api } from './api';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

const MAX_RETRIES = 3;
const RETRY_DELAY = 300000 // 1 segundo


// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: api,
  // timeout: 10000, // Tiempo de espera
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
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const config = error.config;
//     if (!config || !config.retryCount) {
//       config.retryCount = 0;
//     }

//     if (config.retryCount < MAX_RETRIES) {
//       config.retryCount += 1;
//       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//       return axiosInstance(config);
//     }

//     if (error.response && error.response.status === 401) {
//       // Redirigir al usuario a la página de inicio de sesión
//       window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
