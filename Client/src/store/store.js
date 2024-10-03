import { configureStore } from '@reduxjs/toolkit'
import { administracionSlice } from './Administracion/administracionSlice';
import { categorizacionSlice } from './Administracion/Categorizacion/categorizacionSlice';
import { rolSlice } from './Roles/rolSlice';

export const store = configureStore({
  reducer: {
    administracion: administracionSlice.reducer,
    categorias: categorizacionSlice.reducer,
    rol: rolSlice.reducer
  },
});