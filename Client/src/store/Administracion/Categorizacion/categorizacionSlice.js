import { createSlice } from '@reduxjs/toolkit';

export const categorizacionSlice = createSlice({
    name: 'categorizacion',
    initialState: {
        categorias: [
            {
                Nombre: 'Uno',
                Tipos: [{ tipo: 'A', view: true }, { tipo: 'B', view: true }, { tipo: 'C', view: true }],
                view: true,
            },
            {
                Nombre: 'Dos',
                Tipos: [{ tipo: 'D', view: true }, { tipo: 'E', view: true }, { tipo: 'F', view: true }],
                view: true
            },
            {
                Nombre: 'Tres',
                Tipos: [{ tipo: 'X', view: true }, { tipo: 'Y', view: true }, { tipo: 'Z', view: true }],
                view: true
            }
        ]
    },
    reducers: {
        setCategorias: (state, action) => {
            state.categorias = action.payload;
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