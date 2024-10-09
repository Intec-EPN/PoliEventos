import { createSlice } from '@reduxjs/toolkit';

export const permisoSlice = createSlice({
    name: 'permiso',
    initialState: {
        permisosAcciones: [],
    },
    reducers: {
        setPermisosAcciones: (state, action) => {
            state.permisosAcciones = action.payload;
          },
    }
});

// Action creators are generated for each case reducer function
export const { setPermisosAcciones } = permisoSlice.actions;