import axiosInstance from "../../../api/axiosConfig";
import { setAcciones, setPermisosAcciones } from "./permisoSlice";

export const startLoadingPermisosAcciones = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/admin/permisos/get', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setPermisosAcciones(response.data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};




export const startLoadingAcciones = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/admin/permisos/getbase', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setAcciones(response.data));
            dispatch(startLoadingPermisosAcciones());
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};