import axiosInstance from "../../../api/axiosConfig";
import { setDepartamentos } from "./departamentoSlice";

export const startLoadingDepartamentos = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axiosInstance.get('/admin/departamentos/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const departamentos = data.map(dept => dept.departamento);
            dispatch(setDepartamentos(departamentos));
        } catch (error) {
            throw new Error("Error al cargar", error);
        };
    };
};