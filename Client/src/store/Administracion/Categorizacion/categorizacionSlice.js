import { createSlice } from '@reduxjs/toolkit';

export const categorizacionSlice = createSlice({
    name: 'categorizacion',
    initialState: {
        categorias: [
            {
                Nombre: 'Uno',
                Tipo: ['A', 'B', 'C']
            },
            {
                Nombre: 'Dos',
                Tipo: ['D', 'E', 'G']
            },
            {
                Nombre: 'Tres',
                Tipo: ['W', 'X', 'Z']
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
                categoriaEncontrada.Tipo.push(nuevoTipo);
            }
        },

    }
});

// Action creators are generated for each case reducer function
export const { setCategorias } = categorizacionSlice.actions;