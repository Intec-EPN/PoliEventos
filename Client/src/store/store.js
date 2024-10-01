import { configureStore } from '@reduxjs/toolkit'
import { administracionSlice } from './Administracion/administracionSlice';
import { categorizacionSlice } from './Administracion/Categorizacion/categorizacionSlice';

export const store = configureStore({
  reducer: {
    administracion: administracionSlice.reducer,
    categorias: categorizacionSlice.reducer
  },
});