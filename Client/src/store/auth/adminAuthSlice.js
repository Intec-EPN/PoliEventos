import { createSlice } from '@reduxjs/toolkit';

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        user: null,
        rol: null,
        permisos: [],
        nivelPropio: false,
        nivelDepartamento: false,
        nivelFacultad: false,
        departamento: null,
        departamentoNivelId: null, 
        facultad: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            const rol = action.payload.user.roles[0];
            state.rol = rol;
            state.facultad = rol.facultad_id;
            const nivelAcceso = action.payload.user.nivelAcceso;
            const propio = action.payload.user.propio;
            console.log(action.payload);
            if (propio) {
                state.nivelPropio = true;
                state.departamento = rol.departamento_id;
            } 
            if (nivelAcceso === 'departamento') {
                state.nivelDepartamento = true;
                state.nivelFacultad = false;
                state.departamento = rol.departamento_id;
                state.departamentoNivelId = rol.departamento_id;
            } else if (nivelAcceso === 'facultad') {
                state.nivelDepartamento = false;
                state.nivelFacultad = true;
                state.departamento = null;
            } else {
                state.nivelPropio = false;
                state.nivelDepartamento = false;
                state.nivelFacultad = false;
                state.departamento = null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.rol = null;
            state.permisos = [];
            state.nivelPropio = false;
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