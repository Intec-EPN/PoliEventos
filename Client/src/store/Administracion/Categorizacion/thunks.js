import axiosInstance from "../../../api/axiosConfig";
import { setEsquemas } from "./categorizacionSlice";

export const startLoadingEsquemas = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/admin/esquemas/get');
            console.log('debug', response.data);
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
            
            const response = await axiosInstance.put(`/admin/esquemas/${id}`, data);
        } catch (error) {

        }
    };
};