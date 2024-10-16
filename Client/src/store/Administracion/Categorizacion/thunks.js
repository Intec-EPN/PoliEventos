import axiosInstance from "../../../api/axiosConfig";
import { setEsquemas } from "./categorizacionSlice";

export const startLoadingEsquemas = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/esquemas/get');
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

            await axiosInstance.put(`/admin/esquemas/${id}`, data);
        } catch (error) {

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
                visible: esquemaCategorizacionActual.visible,
                categorias: esquemaCategorizacionActual.categorias
            };

            // Realiza la petición POST para crear el nuevo esquema
            const response = await axiosInstance.post('/admin/esquemas', data);

            // Supongamos que recibes el nuevo esquema creado en la respuesta
            console.log(response.data)

        } catch (error) {
            console.error("Error creando el esquema:", error);
        }
    };
};

export const startChangingVisible = () => {
    return async (dispatch, getState) => {
        try {
            // Obtengo ell id del esquema
            const {idEsquemaCambiarVisibilidad} = getState().categorizacion;
            await axiosInstance.put(`/admin/esquemas/visibilidad/${idEsquemaCambiarVisibilidad}`);

        } catch (error) {
            
        }
    }
}