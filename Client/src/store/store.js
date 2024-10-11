import { configureStore } from '@reduxjs/toolkit'
import { administracionSlice } from './Administracion/administracionSlice';
import { categorizacionSlice } from './Administracion/Categorizacion/categorizacionSlice';
import { rolSlice } from './Administracion/Roles/rolSlice';
import { permisoSlice } from './Administracion/Permisos/permisoSlice';

export const store = configureStore({
  reducer: {
    administracion: administracionSlice.reducer,
    categorias: categorizacionSlice.reducer,
    rol: rolSlice.reducer,
    permiso: permisoSlice.reducer
  },
});