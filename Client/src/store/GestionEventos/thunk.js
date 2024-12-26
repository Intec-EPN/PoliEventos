import axiosInstance from "../../api/axiosConfig";
import { setDepartamentos, setEsquemasCategorias, setEventos, setFilesObtenidos } from "./gestionEventosSlice";
import { saveAs } from "file-saver";

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
            dispatch(startDeletingArchivos({eventoId}))
            dispatch(startLoadingEventos());
        } catch (error) {
            throw new Error("Error al eliminar evento");
        }
    };
}

export const startDeletingArchivos = ({ eventoId }) => {
    console.log("eventoId", eventoId);
    
    return async (dispatch) => {
        try {
            const url = `/gestion/archivo/${eventoId}`;
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

export const startLoadingArchivosPorIds = (eventIds) => {
    return async (dispatch) => {
        try {
            const archivos = [];
            for (const eventId of eventIds) {
                const { data } = await axiosInstance.get(`/gestion/archivos/${eventId}`);
                archivos.push(...data.archivos);
            }
            if (archivos.length > 0) {
                dispatch(startDescargarArchivosZip(archivos));
            } else {
                alert("No se encontraron archivos para los eventos seleccionados");
            }
        } catch (error) {
            console.error("Error al cargar archivos por IDs", error);
            alert("Error al cargar archivos por IDs");
        }
    };
};

export const startDescargarArchivosZip = (archivos) => {
    return async () => {
        try {
            const { data } = await axiosInstance.post("/gestion/descargar-zip", { archivos }, {
                responseType: 'blob',
            });
            const blob = new Blob([data], { type: 'application/zip' });
            saveAs(blob, 'archivos.zip');
        } catch (error) {
            console.error("Error al descargar archivos ZIP", error);
            alert("Error al descargar archivos ZIP");
        }
    };
};

export const startEditingArchivosPorEvento = ({ eventoId, nuevoDepartamento }) => {
    return async (dispatch) => {
        try {
            const url = `/gestion/archivos/${eventoId}`;
            const response = await axiosInstance.patch(url, { nuevoDepartamento });
            if (!response.status === 200) {
                alert(response.data.error || "Error al renombrar archivos");
            } 
        } catch (error) {
            console.error("Error al renombrar archivos", error);
            alert("Error al renombrar archivos");
        }
    };
};

