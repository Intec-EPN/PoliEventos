import axiosInstance from "../../../api/axiosConfig";
import { setDepartamento, setPermisos, setRoles } from "./rolSlice";

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

export const startLoadingDepartamentosFacultades = () => {
    return async (dispatch) => {
        try {
            // Para escalar a más facultades, aquí se enviará el id de la facultad.
            const { data: deptFacultad } = await axiosInstance.get('admin/facultades/getdept/1');

            const departamentosFacultad = deptFacultad.map(dept => dept.departamento);

            dispatch(setDepartamento(departamentosFacultad))

        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    }
};

export const startLoadingPermisosEstructura = () => {
    return async (dispatch) => {
        try {
            // Traigo los permisos con sus correspondientes cuestiones.
            const { data } = await axiosInstance.get('admin/permisos/estructura');
            dispatch(setPermisos(data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    }
};