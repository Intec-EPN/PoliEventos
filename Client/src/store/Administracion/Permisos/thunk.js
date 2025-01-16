import axiosInstance from "../../../api/axiosConfig";
import { setAcciones, setPermisosAcciones } from "./permisoSlice";

// export const startLoadingPermisosAcciones = () => {
//     return async (dispatch) => {
//         try {
//             const response = await axiosInstance.get('/admin/permisos/get', {
//                 withCredentials: true,
//             });
//             dispatch(setPermisosAcciones(response.data));
//         } catch (error) {
//             throw new Error("Error al cargar", error);
//         }
//     };
// };


export const startLoadingPermisosAcciones = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('https://polieventos-api.onrender.com/api/admin/permisos/get', {
          method: 'GET',
          credentials: 'include', // Asegúrate de enviar credenciales (cookies)
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        dispatch(setPermisosAcciones(data));
      } catch (error) {
        console.error("Error al cargar permisos acciones:", error);
        throw new Error("Error al cargar permisos acciones");
      }
    };
  };


export const startLoadingAcciones = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/permisos/getbase',{
                withCredentials: true,
            });
            dispatch(setAcciones(response.data));
            dispatch(startLoadingPermisosAcciones());
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};