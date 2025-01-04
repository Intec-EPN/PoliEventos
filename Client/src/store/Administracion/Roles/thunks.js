import axiosInstance from "../../../api/axiosConfig";
import { setCreandoRolEnBase, setDepartamento, setFacultades, setPermisos, setRoles } from "./rolSlice";

export const startLoadingRoles = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/roles/array', {
                withCredentials: true,
            });
            dispatch(setRoles(response.data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};

export const startLoadingFacultades = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/facultades/', {
                withCredentials: true,
            });
            dispatch(setFacultades(response.data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};

export const startLoadingDepartamentosFacultades = () => {
    return async (dispatch) => {
        try {
            // Para escalar a más facultades, aquí se enviará el id de la facultad.
            const { data: deptFacultad } = await axiosInstance.get('admin/facultades/getdept/1', {
                withCredentials: true,
            });

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
            const { data } = await axiosInstance.get('admin/permisos/estructura', {
                withCredentials: true,
            });
            dispatch(setPermisos(data));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    }
};

export const startCreatingRoles = (rolData) => {
    return async (dispatch) => {
        dispatch(setCreandoRolEnBase(true));
        try {
            await axiosInstance.post('admin/roles/create', rolData, {
                withCredentials: true,
            });
            dispatch(startLoadingRoles());
            dispatch(setCreandoRolEnBase(false));
            return true;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); 
            }            
            dispatch(setCreandoRolEnBase(false)); 
            return false;
        }
    }
};

export const startDeletingRol = (nombre) => {
    return async (dispatch) => {
        try {
            await axiosInstance.delete(`admin/roles/${nombre.trim()}`, {
                withCredentials: true,
            }); // Trimear el nombre del rol
            // TODO debug
            dispatch(startLoadingRoles());
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); 
            }            
        }
    }
}