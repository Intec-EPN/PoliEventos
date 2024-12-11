import { createSlice } from '@reduxjs/toolkit';

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        user: null,
        rol: null,
        permisos: [],
        nivelDepartamento: false,
        nivelFacultad: false,
        departamento: null,
        facultad: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            const rol = action.payload.user.roles[0];
            state.rol = rol;
            state.facultad = rol.facultad_id;
            if (rol.departamento_id) {
                state.nivelDepartamento = true;
                state.nivelFacultad = false;
                state.departamento = rol.departamento_id;
            } else {
                state.nivelDepartamento = false;
                state.nivelFacultad = true;
                state.departamento = null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.rol = null;
            state.permisos = null;
            state.nivelDepartamento = false;
            state.nivelFacultad = false;
            state.departamento = null;
            state.facultad = null;
        },
        setPermisos: (state, action) => {
            state.permisos = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout, setPermisos } = adminAuthSlice.actions;