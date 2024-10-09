import axiosInstance from "../../api/axiosConfig";
import { setRoles } from "./rolSlice";

export const startLoadingRoles = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/roles/array');
            dispatch(setRoles(response.data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};

