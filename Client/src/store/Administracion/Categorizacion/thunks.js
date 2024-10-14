import axiosInstance from "../../../api/axiosConfig";
import { setCategorias } from "./categorizacionSlice";

export const startLoadingEsquemas = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/esquemas/get');
            dispatch(setCategorias(response.data))
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};