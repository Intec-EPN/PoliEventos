import { createSlice } from '@reduxjs/toolkit';

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        user: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = adminAuthSlice.actions;