import axiosInstance from "../../api/axiosConfig";
import { setDepartamentos, setEsquemasCategorias, setEventos, setFilesObtenidos } from "./gestionEventosSlice";


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

export const startCreateEvento = (files) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const eventoCreacion = state.gestionEvento.eventoCreacion;
            const departamentos = state.gestionEvento.eventoCreacion.data.departamento;

            const usuarioId = state.adminAuth.user.id;

            const { data } = await axiosInstance.post("/gestion",
                {
                    usuarioId: usuarioId,
                    eventoCreacion: eventoCreacion
                }
                //     , {
                //     withCredentials: true,
                // }
            );
            console.log(data);

            const eventoId = data.evento.id; // Obtener el ID del evento

            if (files.length > 0) {
                dispatch(startUpLoadingArchivos({ files, eventoId, departamentos }));
            }
            dispatch(startLoadingEventos());
        } catch (error) {
            console.error("Error al crear evento", error);
            throw new Error("Error al crear evento");
        }
    };
};

export const startEditingEvento = (eventoId, files) => {
    console.log("files", files);
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const eventoEdicion = state.gestionEvento.eventoEdicion;
            const departamentos = state.gestionEvento.eventoEdicion.data.departamento;
            const usuarioId = state.adminAuth.user.id;

            console.log("eventoEdicion", eventoEdicion);
            

            const url = `/gestion/${eventoId}`;
            await axiosInstance.put(url,
                {
                    usuarioId: usuarioId,
                    eventoEdicion: eventoEdicion
                }
                //     , {
                //     withCredentials: true,
                // }
            );
            if (files.length > 0) {
                dispatch(startUpLoadingArchivos({ files, eventoId, departamentos }));
            }
            dispatch(startLoadingEventos());
        } catch (error) {
            console.error("Error al editar evento", error);
            throw new Error("Error al editar evento");
        }
    };
};


export const startUpLoadingArchivos = ({ files, eventoId, departamentos }) => {
    return async (dispatch) => {
        const departamentosFormatted = departamentos.join("__");
        const formData = new FormData();
        files.forEach((file) => {
            const newFileName = `${file.name}__${eventoId}__${departamentosFormatted}${file.name.substring(file.name.lastIndexOf('.'))}`;
            formData.append("files", file, newFileName);
        });
        try {
            await axiosInstance.post("/gestion/subir", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Archivos subidos exitosamente");
        } catch (error) {
            console.error("Error al subir archivos", error);
            alert("Error al subir archivos");
        }
    }
}


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
            const { data } = await axiosInstance.get("/gestion/esquemas_categorias/"
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


export const startLoadingArchivos = (eventoId) => {
    return async (dispatch) => {
        let { eventId } = eventoId;
        try {
            const { data } = await axiosInstance.get(`/gestion/archivos/${eventId}`
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(setFilesObtenidos(data));
        } catch (error) {
            console.error("Error al cargar archivos", error);
            throw new Error("Error al cargar archivos");
        }
    };
}

export const startDeletingArchivo = ({ nombreArchivo, eventoId }) => {
    return async (dispatch) => {
        try {
            const url = `/gestion/archivo/${nombreArchivo}/${eventoId.eventId}`;
            console.log(url);

            await axiosInstance.delete(url
                //     , {
                //     withCredentials: true,
                // }
            );
            dispatch(startLoadingEventos());
        } catch (error) {
            throw new Error("Error al eliminar archivo");
        }
    };
}
