import axiosInstance from "../../../api/axiosConfig";
import { setDepartamentos } from "./departamentoSlice";

export const startLoadingDepartamentos = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get('/admin/departamentos/', {
                withCredentials: true,
            });
            const departamentos = data.map(dept => dept.departamento);
            dispatch(setDepartamentos(departamentos));
        } catch (error) {
            throw new Error("Error al cargar", error);
        };
    };
};