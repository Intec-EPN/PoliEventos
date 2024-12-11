import axiosInstance from "../../api/axiosConfig";
import { setDepartamentos, setEsquemasCategorias, setEventos } from "./gestionEventosSlice";


export const startLoadingEventos = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get("/gestion"
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(setEventos(data));
        } catch (error) {
            console.error("Error al cargar eventos", error);
            throw new Error("Error al cargar eventos");
        }
    };
};

export const startCreateEvento = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const eventoCreacion = state.gestionEvento.eventoCreacion;
            const usuarioId = state.adminAuth.user.id;
            console.log(usuarioId);

            await axiosInstance.post("/gestion",
                {
                    usuarioId: usuarioId,
                    eventoCreacion: eventoCreacion
                }
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(startLoadingEventos());
        } catch (error) {
            console.error("Error al crear evento", error);
            throw new Error("Error al crear evento");
        }
    };
};

export const startDeletingEvento = (eventoId) => {
    return async (dispatch) => {
        try {
            const url = `/gestion/${eventoId}`;
            await axiosInstance.delete(url
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(startLoadingEventos());
        } catch (error) {
            throw new Error("Error al eliminar evento");
        }
    };
}

export const startEditingEvento = (eventoId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const eventoEdicion = state.gestionEvento.eventoEdicion;

            const url = `/gestion/${eventoId}`;
            await axiosInstance.put(url,
                {
                    usuarioId: 'b2d581cb-6be0-4598-891a-68a4edbfb4a8',
                    eventoEdicion: eventoEdicion
                }
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(startLoadingEventos());
        } catch (error) {
            console.error("Error al editar evento", error);
            throw new Error("Error al editar evento");
        }
    };
};

export const startLoadingDepartamentos = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get("/gestion/departamentos/"
                //     , {
                //     withCredentials: true,
                // }
            );            
            dispatch(setDepartamentos(data));
        } catch (error) {
            console.error("Error al cargar departamentos", error);
            throw new Error("Error al cargar departamentos");
        }
    };
}

export const startLoadingEsquemasCategorias = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get("/gestion//esquemas_categorias/"
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(setEsquemasCategorias(data));
        } catch (error) {
            console.error("Error al cargar departamentos", error);
            throw new Error("Error al cargar departamentos");
        }
    };
}


