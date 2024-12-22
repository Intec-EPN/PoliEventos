import { createSlice } from '@reduxjs/toolkit';

export const gestionEventosSlice = createSlice({
    name: 'gestionEventos',
    initialState: {
        eventos: [],
        eventoCreacion: {
            title: "",
            start: null,
            end: null,
            data: {
                lugar: "",
                descripcion: "",
                personasACargo: [],
                expositores: [],
                esquemaCategoria: [],
                departamento: [],
                enlaces: ""
            }
        },
        eventoEdicion: {
            title: "",
            start: null,
            end: null,
            data: {
                lugar: "",
                descripcion: "",
                personasACargo: [],
                expositores: [],
                esquemaCategoria: [],
                departamento: [],
                enlaces: ""
            }
        },
        departamentos: [],
        esquemasCategorias: [],
        files: [],
        filesObtenidos: []
    },
    reducers: {
        setStart: (state, action) => {
            state.eventoCreacion.start = action.payload;
        },
        setEnd: (state, action) => {
            state.eventoCreacion.end = action.payload;
        },
        setEventoCreacion: (state, action) => {
            const {
                titulo,
                start,
                end,
                lugar,
                descripcion,
                departamento,
                esquemasCategorias,
                personasCargo,
                expositores,
                enlaces
            } = action.payload;

            state.eventoCreacion = {
                start: start,
                end: end,
                title: titulo,
                data: {
                    lugar,
                    descripcion,
                    departamento: departamento || [],
                    esquemaCategoria: esquemasCategorias || [],
                    personasACargo: personasCargo || [],
                    expositores: expositores || [],
                    enlaces
                },
            };            
        },
        setEventoEdicion: (state, action) => {
            const {
                titulo,
                start,
                end,
                lugar,
                descripcion,
                departamento,
                esquemasCategorias,
                personasCargo,
                expositores,
                enlaces 
            } = action.payload;

            state.eventoEdicion = {
                start: start,
                end: end,
                title: titulo,
                data: {
                    lugar,
                    descripcion,
                    departamento: departamento || [],
                    esquemaCategoria: esquemasCategorias || [],
                    personasACargo: personasCargo || [],
                    expositores: expositores || [],
                    enlaces
                },
            };
            console.log(state.eventoEdicion);
            
        },
        setDepartamentos: (state, action) => {
            state.departamentos = action.payload;
        },
        setEsquemasCategorias: (state, action) => {
            state.esquemasCategorias = action.payload;
        },
        setEventos: (state, action) => {
            state.eventos = action.payload;
        },
        limpiarEventoCreacion: (state) => {
            state.eventoCreacion = {
                title: "",
                start: null,
                end: null,
                data: {
                    lugar: "",
                    descripcion: "",
                    personasACargo: [],
                    expositores: [],
                    esquemaCategoria: [],
                    departamento: [],
                    enlaces:""
                }
            }
        },
        setFilesSlice: (state, action) => {
            state.files = action.payload;
        },
        setFilesObtenidos: (state, action) => {
            state.filesObtenidos = action.payload;
        },
        limpiarFiles: (state) => {
            state.filesObtenidos = [];
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setTitle,
    setStart,
    setEnd,
    setEventoCreacion,
    setDepartamentos,
    setEsquemasCategorias,
    setEventos,
    setEventoEdicion,
    limpiarEventoCreacion,
    setFilesSlice,
    setFilesObtenidos,
    limpiarFiles
} = gestionEventosSlice.actions;