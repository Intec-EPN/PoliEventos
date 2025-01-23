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
    // Si el token es inválido o está mal formado, mostrar un alert y reiniciar la página
    if (error.response && error.response.status === 400 && error.response.data.message === 'El token es inválido o está mal formado.') {
      localStorage.removeItem('token');
      alert('Lo sentimos, hubo un error. Vuelve a iniciar sesión.');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
