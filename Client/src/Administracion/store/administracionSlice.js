import { createSlice } from '@reduxjs/toolkit';

export const administracionSlice = createSlice({
    name: 'administracion',
    initialState: {
        opcion: 'Bienvenido, selecciona una opción.'
    },
    reducers: {
        opcionActual: (state, action) => {
            state.opcion = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { opcionActual } = administracionSlice.actions;