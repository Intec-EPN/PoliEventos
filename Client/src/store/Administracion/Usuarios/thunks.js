import axiosInstance from "../../../api/axiosConfig";
import { setUsuarios } from "./usuariosSlice";

export const startLoadingUsuarios = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/admin/usuarios/get', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setUsuarios(response.data.sort((a, b) => a.nombre.localeCompare(b.nombre))));
        } catch (error) {
            throw new Error("Error al cargar usuarios", error);
        }
    };
}

export const startRolesUsuarios = (usuarioId, rolesIds) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.post('/admin/usuarios/asignar', { usuarioId, rolesIds }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(startLoadingUsuarios());
        } catch (error) {
            throw new Error("Error al asignar roles a usuario.", error);
        }
    };
}

export const startDeletingUsuario = (usuarioId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.delete(`/admin/usuarios/${usuarioId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(startLoadingUsuarios());
        } catch (error) {
            throw new Error("Error al eliminar usuario.", error);
        }
    };
}

export const startChangingEnabled = (usuarioId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.patch(`/admin/usuarios/habilitar/${usuarioId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(startLoadingUsuarios());
        } catch (error) {
            throw new Error("Error al cambiar habilitación de usuario.", error);
        }
    };
};

export const startUpdatingUsuario = (usuarioId, updatedData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.patch(`/admin/usuarios/${usuarioId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(startLoadingUsuarios());
        } catch (error) {
            // Pasar el mensaje de error original del backend
            const errorMessage = error.response?.data?.error || "Error al actualizar usuario.";
            throw new Error(errorMessage);
        }
    };
};