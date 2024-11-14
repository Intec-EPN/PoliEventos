import { createSlice } from '@reduxjs/toolkit';

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuarios: [],
        usuarioAsignar: "",
        rolesAsignar: [],
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
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setUsuarios,
    setUsuarioAsignar,
    setRolesAsignar,
    limpiarAsignacion
} = usuariosSlice.actions;