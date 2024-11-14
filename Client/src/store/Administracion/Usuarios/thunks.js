import axiosInstance from "../../../api/axiosConfig";
import { setUsuarios } from "./usuariosSlice";

export const startLoadingUsuarios = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/usuarios/get');
            dispatch(setUsuarios(response.data));
        } catch (error) {
            throw new Error("Error al cargar usuarios", error);
        }
    };
}

export const startRolesUsuarios = (usuarioId, rolesIds) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/admin/usuarios/asignar', { usuarioId, rolesIds });
        } catch (error) {
            throw new Error("Error al asignar roles a usuario.", error);
        }
    };
}