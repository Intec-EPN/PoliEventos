import { createSlice } from '@reduxjs/toolkit';

export const permisoSlice = createSlice({
    name: 'permiso',
    initialState: {
        permisosAcciones: [],
        acciones: []
    },
    reducers: {
        setPermisosAcciones: (state, action) => {
            state.permisosAcciones = action.payload;
          },
        setAcciones: (state, action) => {
            state.acciones = action.payload;
          },
    }
});

// Action creators are generated for each case reducer function
export const { setPermisosAcciones, setAcciones } = permisoSlice.actions;