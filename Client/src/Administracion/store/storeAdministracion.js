import { configureStore } from '@reduxjs/toolkit'
import { administracionSlice } from './administracionSlice';

export const storeAdministracion = configureStore({
  reducer: {
    administracion: administracionSlice.reducer,
  },
});