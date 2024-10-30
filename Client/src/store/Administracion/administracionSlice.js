import { createSlice } from '@reduxjs/toolkit';

export const administracionSlice = createSlice({
    name: 'administracion',
    initialState: {
        // TODO cambiarlo para mandar de cada componente el nombre.
        opcion: 'Selecciona una opción.'
    },
    reducers: {
        opcionActual: (state, action) => {
            state.opcion = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { opcionActual } = administracionSlice.actions;