import { createSlice } from '@reduxjs/toolkit';

export const categorizacionSlice = createSlice({
    name: 'categorizacion',
    initialState: {
        esquemas: []
            // {
            //     Nombre: 'Uno',
            //     Descripcion: 'Ejemplo UNO',
            //     Tipos: [{ tipo: 'A', view: true }, { tipo: 'B', view: true }, { tipo: 'C', view: true }],
            //     view: true,
            // },
            //
            //
            // {
            // "id": 1,
            // "nombre": "CES",
            // "descripcion": "Tipos de eventos correspondientes al CES",
            // "visible": true,
            // "categorias": [
            //     {
            //         "id": 1,
            //         "nombre": "Servicios a la sociedad que no generen beneficio económico",
            //         "visible": true,
            //         "esquema_id": 1
            //     },
            // }
    },
    reducers: {
        setCategorias: (state, action) => {
            state.esquemas = action.payload;
        },
        agregarTipo: (state, action) => {
            const { categoria, nuevoTipo } = action.payload; 
            // Encuentra la categoría correspondiente
            const categoriaEncontrada = state.categorias.find(cat => cat.Nombre === categoria);
            if (categoriaEncontrada) {
                categoriaEncontrada.Tiposipo.push(nuevoTipo);
            }
        },
        cambiarViewDeTipo: (state, action) => {
            const { categoria, tipo } = action.payload;
            // Encuentra la categoría correspondiente
            const categoriaEncontrada = state.categorias.find(cat => cat.Nombre === categoria);
            if(categoriaEncontrada){
                const tipoEncontrado = categoriaEncontrada.Tipos.find( t => t.tipo === tipo);
                if(tipoEncontrado){
                    tipoEncontrado.view = false;
                }
            }
        },

    }
});

// Action creators are generated for each case reducer function
export const { setCategorias, agregarTipo, cambiarViewDeTipo } = categorizacionSlice.actions;