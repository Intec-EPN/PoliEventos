import axiosInstance from "../../../api/axiosConfig";
import { setCreandoRolEnBase, setDepartamento, setFacultades, setPermisos, setRoles } from "./rolSlice";

export const startLoadingRoles = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/admin/roles/array', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(setRoles(response.data.sort((a, b) => a.rol.localeCompare(b.rol))));
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};

export const startLoadingFacultades = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/admin/facultades/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('token');
            // Para escalar a más facultades, aquí se enviará el id de la facultad.
            const { data: deptFacultad } = await axiosInstance.get('admin/facultades/getdept/1', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('token');
            // Traigo los permisos con sus correspondientes cuestiones.
            const { data } = await axiosInstance.get('admin/permisos/estructura', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('token');
            await axiosInstance.post('admin/roles/create', rolData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('token');
            await axiosInstance.delete(`admin/roles/${nombre.trim()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }); // Trimear el nombre del rol
            dispatch(startLoadingRoles());
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
        }
    }
}