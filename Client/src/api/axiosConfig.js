import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:5000/api"
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

// Interceptores de respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token ha expirado, redirigir a la página de inicio de sesión
    if (error.response && error.response.status === 401 && error.response.data.message === 'El token ha expirado.') {
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
