import axiosInstance from "../../api/axiosConfig";
import { loginSuccess, logout } from "./adminAuthSlice";

export const startLogin = (data) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: data.correo.trim(),
                password: data.contraseña.trim(),
            }, {
                withCredentials: true // Envío Cookies
            });
            dispatch(loginSuccess({user: response.data}));
        } catch (error) {
            throw new Error("Credenciales incorrectas", error);
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