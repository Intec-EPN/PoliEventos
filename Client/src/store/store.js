import { configureStore } from '@reduxjs/toolkit'
import { administracionSlice } from './Administracion/administracionSlice';
import { categorizacionSlice } from './Administracion/Categorizacion/categorizacionSlice';
import { rolSlice } from './Administracion/Roles/rolSlice';
import { permisoSlice } from './Administracion/Permisos/permisoSlice';
import { departamentoSlice } from './Administracion/Departamentos/departamentoSlice';

export const store = configureStore({
  reducer: {
    administracion: administracionSlice.reducer,
    categorizacion: categorizacionSlice.reducer,
    rol: rolSlice.reducer,
    permiso: permisoSlice.reducer,
    departamento: departamentoSlice.reducer
  },
});