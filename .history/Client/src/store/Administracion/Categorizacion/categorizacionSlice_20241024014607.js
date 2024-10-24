import { createSlice } from '@reduxjs/toolkit';

export const categorizacionSlice = createSlice({
    name: 'categorizacion',
    initialState: {
        esquemaActual: '',
        esquemas: [],
        categoriasActuales: [],
        esquemaCategorizacionActual: {},
        idEsquemaCambiarVisibilidad: '',
        idCategoriaCambiarVisibilidad: '',
        cancelar: false,
    },
    reducers: {
        setEsquemas: (state, action) => {
            state.esquemas = action.payload;
        },
        eliminarEsquema: (state, action) => {
            const idEsquemaEliminar = action.payload;
            state.esquemas = state.esquemas.filter(esq => esq.id != idEsquemaEliminar);
        },

        agregarCategoria: (state, action) => {
            state.categoriasActuales.push(action.payload);
        },
        // agregarCategoria: (state, action) => {
        //     const { esquema, nuevoTipo: nuevaCategoria } = action.payload;
        //     // Encuentra la categoría correspondiente
        //     const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === esquema);
        //     if (esquemaEncontrado) {
        //         esquemaEncontrado.Tiposipo.push(nuevaCategoria);
        //     }
        // },
        eliminarCategoria: (state, action) => {
            const {idCategoria, idEsquema} = action.payload;
            const esquemaEncontrado = state.esquemas.find(esq => esq.id === idEsquema);
            if(esquemaEncontrado){
                // Filtro las categorias de ese esquema quitando la indicada
                esquemaEncontrado.categorias = esquemaEncontrado.categorias.filter(cat => cat.id !== idCategoria);
            }
        },
        setEsquemaActual: (state, action) => {
            state.esquemaActual = action.payload;
        },
        cambiarVisibilidadEsquema: (state, action) => {
            const esquemaEncontrado = state.esquemas.find(esq => esq.nombre === action.payload);
            if (esquemaEncontrado) {
                esquemaEncontrado.visible = !esquemaEncontrado.visible;
                state.idEsquemaCambiarVisibilidad = esquemaEncontrado.id;
            }
        },         
        cambiarVisibilidadCategoria: (state, action) => {
            const { idEsquema, idCategoria } = action.payload;
            // Encuentra la categoría correspondiente
            const esquemaEncontrado = state.esquemas.find(esq => esq.id === idEsquema);
            if (esquemaEncontrado) {
                const categoriaEncontrada = esquemaEncontrado.categorias.find(cat => cat.id === idCategoria);
                if (categoriaEncontrada) {
                    categoriaEncontrada.visible = !categoriaEncontrada.visible;
                    state.idCategoriaCambiarVisibilidad = categoriaEncontrada.id;
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
        setNuevoEsquemaCategorizacionActual: (state, action) => {
            state.esquemaCategorizacionActual = action.payload;
        },
        actualizarEsquemaCategoriaActual: (state, action) => {
            state.esquemaCategorizacionActual.categorias = action.payload;
        },
        actualizarNombreEsquemaCategoriaActual: (state, action) => {
            if(!!state.esquemaCategorizacionActual){
                state.esquemaCategorizacionActual.nombre = action.payload;
            }
        },
        actualizarDescripcionEsquemaCategoriaActual:(state, action) => {
            if(!!state.esquemaCategorizacionActual){
                state.esquemaCategorizacionActual.descripcion = action.payload;
            }
        },
        limpiarEsquemaCategorizacionActual: (state) => {
            state.esquemaCategorizacionActual = {};
        },
        setCancelar: (state, action) => {
            state.cancelar = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setEsquemas,
    eliminarEsquema,
    agregarCategoria,
    // agregarCategoria: agregarTipo,
    eliminarCategoria,
    setEsquemaActual,
    cambiarVisibilidadEsquema,
    cambiarVisibilidadCategoria,
    agregarEsquema,
    setEsquemaCategorizacionActual,
    actualizarEsquemaCategoriaActual,
    actualizarNombreEsquemaCategoriaActual,
    actualizarDescripcionEsquemaCategoriaActual,
    limpiarEsquemaCategorizacionActual,
    actualizarEsquemas,
    setNuevoEsquemaCategorizacionActual,
    setCancelar
} = categorizacionSlice.actions;