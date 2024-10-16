import { createSlice } from '@reduxjs/toolkit';

export const categorizacionSlice = createSlice({
    name: 'categorizacion',
    initialState: {
        esquemaActual: '',
        esquemas: [],
        esquemaCategorizacionActual: {},
        idEsquemaCambiarVisibilidad: '',
    },
    reducers: {
        setEsquemas: (state, action) => {
            state.esquemas = action.payload;
        },
        agregarTipo: (state, action) => {
            const { esquema, nuevoTipo } = action.payload; 
            // Encuentra la categoría correspondiente
            const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === esquema);
            if (esquemaEncontrado) {
                esquemaEncontrado.Tiposipo.push(nuevoTipo);
            }
        },
        setEsquemaActual: (state, action) => {
            state.esquemaActual = action.payload;
        },
        cambiarVisibilidadEsquema: (state, action) => {
            const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === action.payload);
            if(esquemaEncontrado){
                esquemaEncontrado.visible = !esquemaEncontrado.visible;
                state.idEsquemaCambiarVisibilidad = esquemaEncontrado.id;
            }
        },
        cambiarViewDeTipo: (state, action) => {
            const { esquema, tipo } = action.payload;
            // Encuentra la categoría correspondiente
            const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === esquema);
            if(esquemaEncontrado){
                const tipoEncontrado = esquemaEncontrado.Tipos.find( t => t.tipo === tipo);
                if(tipoEncontrado){
                    tipoEncontrado.view = false;
                }
            }
        },
        agregarEsquema: (state, action) => {
            const esquema = {
                ...action.payload,
                visible: true,
                categorias: []
            }
            state.esquemas.push(esquema);
        },
        setEsquemaCategorizacionActual: (state, action) => {
            const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === action.payload);
            if (esquemaEncontrado) {
                state.esquemaCategorizacionActual = esquemaEncontrado;
            } else {
                console.log('No se encontró el esquema.');
            }
        },
        setNuevoEsquemaCategorizacionActual: (state,action) => {
            state.esquemaCategorizacionActual = action.payload;
        },
        actualizarEsquemaCategoriaActual: (state, action) => {
            state.esquemaCategorizacionActual.categorias = action.payload;
        },
        limpiarEsquemaCategorizacionActual: (state) => {
            state.esquemaCategorizacionActual = {};
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    setEsquemas,
    agregarTipo,
    setEsquemaActual,
    cambiarVisibilidadEsquema,
    cambiarViewDeTipo,
    agregarEsquema,
    setEsquemaCategorizacionActual,
    actualizarEsquemaCategoriaActual,
    limpiarEsquemaCategorizacionActual,
    actualizarEsquemas,
    setNuevoEsquemaCategorizacionActual
} = categorizacionSlice.actions;