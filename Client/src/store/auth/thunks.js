import axiosInstance from "../../api/axiosConfig";
import { loginSuccess, logout, setPermisos } from "./adminAuthSlice";

export const startLogin = (data) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: data.correo.trim(),
                password: data.contraseña.trim(),
            }, {
                withCredentials: true
            });

            await dispatch(loginSuccess({ user: response.data }));
            await dispatch(startLoadingPermisos(response.data.roles[0].rol_id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error("Credenciales incorrectas");
            } else if (error.response && error.response.data && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Error al iniciar sesión");
            }
        }
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await axiosInstance.post("/auth/logout", {}, {
                withCredentials: true
            });
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
            const { data } = await axiosInstance.get(`/gestion/permisos/${id}`, {
                withCredentials: true,
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

