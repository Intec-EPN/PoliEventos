import axiosInstance from "../../api/axiosConfig";
import { loginSuccess, logout, setPermisos } from "./adminAuthSlice";

export const startLogin = (data) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: data.correo.trim(),
                password: data.contraseña.trim(),
            });

            // Guardar el token en el almacenamiento local.
            localStorage.setItem("token", response.data.token);

            await dispatch(loginSuccess({ user: response.data }));
            await dispatch(startLoadingPermisos(response.data.roles[0].rol_id));
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem('token');
            dispatch(logout());
        } catch (error) {
            console.error("Error al cerrar sesión", error);
            throw new Error("Error al cerrar sesión");
        }
    };
};

export const startLoadingPermisos = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token'); 
            const { data } = await axiosInstance.get(`/gestion/permisos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
            const permisos = data.map(permiso => ({
                permisoId: permiso.permiso_id,
                accionNombre: permiso.accion,
                nivelId: permiso.nivel_id
            }));
            dispatch(setPermisos(permisos));
        } catch (error) {
            console.error("Error al cargar permisos", error);
            throw new Error("Error al cargar permisos");
        }
    };
};

