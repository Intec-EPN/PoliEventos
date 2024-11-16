import { createSlice } from '@reduxjs/toolkit';

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuarios: [],
        usuarioAsignar: "",
        rolesAsignar: [],
        usuarioActual: "",
    },
    reducers: {
        setUsuarios: (state, action) => {
            state.usuarios = action.payload;
        },
        setUsuarioAsignar: (state, action) => {
            state.usuarioAsignar = action.payload;
        },
        setRolesAsignar: (state, action) => {
            state.rolesAsignar = action.payload;
        },
        limpiarAsignacion: (state) => {
            state.usuarioAsignar = "";
            state.rolesAsignar = [];
        },
        setUsuarioActual: (state, action) => {
            state.usuarioActual = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setUsuarios,
    setUsuarioAsignar,
    setRolesAsignar,
    limpiarAsignacion,
    setUsuarioActual,
    puedeBorrarse
} = usuariosSlice.actions;