import { createSlice } from '@reduxjs/toolkit';

export const departamentoSlice = createSlice({
    name: 'departamento',
    initialState: {
        departamentos: []
    },
    reducers: {
        setDepartamentos: (state, action) => {
            state.departamentos = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setDepartamentos } = departamentoSlice.actions;