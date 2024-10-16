import { configureStore } from '@reduxjs/toolkit';
import { administracionSlice } from './Administracion/administracionSlice';
import { categorizacionSlice } from './Administracion/Categorizacion/categorizacionSlice';
import { rolSlice } from './Administracion/Roles/rolSlice';
import { permisoSlice } from './Administracion/Permisos/permisoSlice';
import { departamentoSlice } from './Administracion/Departamentos/departamentoSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // Asegúrate de importar combineReducers

// Configuración del persist
const persistConfig = {
  key: 'root',
  storage,
};

// Configuración de reducers utilizando combineReducers
const rootReducer = combineReducers({
  administracion: administracionSlice.reducer,
  categorizacion: categorizacionSlice.reducer,
  rol: rolSlice.reducer,
  permiso: permisoSlice.reducer,
  departamento: departamentoSlice.reducer,
});

// Persistencia en reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear el store con el reducer persistente:
export const store = configureStore({
  reducer: persistedReducer,
});

// Configuro el persistor
export const persistor = persistStore(store);


// export const store = configureStore({
//   reducer: {
//     administracion: administracionSlice.reducer,
//     categorizacion: categorizacionSlice.reducer,
//     rol: rolSlice.reducer,
//     permiso: permisoSlice.reducer,
//     departamento: departamentoSlice.reducer
//   },
// });