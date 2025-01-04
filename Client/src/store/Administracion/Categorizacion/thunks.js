import axiosInstance from "../../../api/axiosConfig";
import { agregarEsquema, eliminarCategoria, eliminarEsquema, setCancelar, setEsquemas } from "./categorizacionSlice";

export const startLoadingEsquemas = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/esquemas/get', {
                withCredentials: true,
            });
            dispatch(setEsquemas(response.data))
        } catch (error) {
            throw new Error("Error al cargar", error);
        }
    };
};

export const startEditingEsquema = (id) => {
    return async (dispatch, getState) => {
        try {
            // Obtengo el esquema actual (lo tengo en redux)
            const { esquemaCategorizacionActual } = getState().categorizacion;

            // Verifica si el ID coincide con el esquema actual 
            if (esquemaCategorizacionActual.id !== id) {
                throw new Error("El esquema actual no coincide con el ID proporcionado.");
            }

            const data = {
                id: id,
                nombre: esquemaCategorizacionActual.nombre,
                descripcion: esquemaCategorizacionActual.descripcion,
                visible: esquemaCategorizacionActual.visible,
                categorias: esquemaCategorizacionActual.categorias
            };
            await axiosInstance.put(`/admin/esquemas/${id}`, data, {
                withCredentials: true,
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error("Error editando el esquema:", error);
            }
            dispatch(setCancelar(true));
        }
    };
};

// Thunk para crear un nuevo esquema
export const startCreatingEsquema = () => {
    return async (dispatch, getState) => {
        try {
            // Obtengo el esquema actual (lo tengo en redux)
            const { esquemaCategorizacionActual } = getState().categorizacion;

            // Creo la data
            const data = {
                nombre: esquemaCategorizacionActual.nombre,
                descripcion: esquemaCategorizacionActual.descripcion,
                visible: true,
            };
            // Realiza la petición POST para crear el nuevo esquema
            await axiosInstance.post('/admin/esquemas', data, {
                withCredentials: true,
            });
            dispatch(startLoadingEsquemas());

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                throw new Error(error);
            }
        }
    };
};

export const startChangingVisible = () => {
    return async (dispatch, getState) => {
        try {
            // Obtengo ell id del esquema
            const { idEsquemaCambiarVisibilidad } = getState().categorizacion;
            await axiosInstance.put(`/admin/esquemas/visibilidad/${idEsquemaCambiarVisibilidad}`, {}, {
                withCredentials: true,
            });
        } catch (error) {
            throw new Error(error);
        }
    }
};


export const startChangingCategoryVisible = () => {
    return async (dispatch, getState) => {
        try {
            // Obtengo ell id del esquema
            const { idCategoriaCambiarVisibilidad } = getState().categorizacion;
            await axiosInstance.put(`/admin/esquemas/categoria/visibilidad/${idCategoriaCambiarVisibilidad}`, {}, {
                withCredentials: true,
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const startDeletingEsquema = (id) => {
    return async (dispatch) => {
        try {
            // Se manda a eliminar con el id simplemente:
            await axiosInstance.delete(`/admin/esquemas/${id}`, {
                withCredentials: true,
            });
            dispatch(eliminarEsquema(id));
        } catch (error) {
            throw new Error(error);
        }
    }
};


export const startDeletingCategory = ({idCategoria, idEsquema}) => {
    console.log(idCategoria, idEsquema);
    
    return async (dispatch) => {
        try {
            // Se manda a eliminar con el id simplemente:
            await axiosInstance.delete(`/admin/esquemas/categoria/${idCategoria}`, {
                withCredentials: true,
            });
            dispatch(eliminarCategoria({idCategoria, idEsquema}));
        } catch (error) {
            throw new Error(error);
        }
    }
};



