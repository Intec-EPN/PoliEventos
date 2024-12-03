import { createSlice } from '@reduxjs/toolkit';

export const gestionEventosSlice = createSlice({
    name: 'gestionEventos',
    initialState: {
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
                departamento: []
            }
        },
        departamentos: [],
        esquemasCategorias: [],
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
                expositores
            } = action.payload;
            console.log(action.payload);

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
                    expositores: expositores || []
                },
            };
        },
        setDepartamentos: (state, action) => {
            state.departamentos = action.payload;
        },
        setEsquemasCategorias: (state, action) => {
            state.esquemasCategorias = action.payload;
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
    setEsquemasCategorias
} = gestionEventosSlice.actions;