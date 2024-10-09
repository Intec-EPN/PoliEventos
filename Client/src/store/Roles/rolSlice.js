import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
  name: 'rol',
  initialState: {
    roles: [], // Array con todos los roles que existen.
    rolEnCreacion: {
      id: '',
      rol: '',
      descripcion: '',
      departamentos: [],
      permisos: [
        { nombre: "Propio", color: "primary", acciones: [] },
        { nombre: "Departamento", color: "#c44b00", acciones: [] },
        { nombre: "Facultad", color: "#0055a4", acciones: [] },
      ],
    },
    creandoRol: false,
  },
  reducers: {
    setRol: (state, action) => {
      state.creandoRol = true;
      state.rolEnCreacion.rol = action.payload;
    },
    setDescripcion: (state, action) => {
      state.creandoRol = true;
      state.rolEnCreacion.descripcion = action.payload;
    },
    manejarPermiso: (state, action) => {
      state.creandoRol = true;
      const { nivel, permisoId } = action.payload;

      // Encontrar el objeto del permiso correspondiente al nivel
      const permisoNivel = state.rolEnCreacion.permisos.find(permiso => permiso.nombre.toLowerCase() === nivel.toLowerCase());

      if (permisoNivel) {
        // Verificar si el permisoId ya está en el array de acciones del nivel
        if (permisoNivel.acciones.includes(permisoId)) {
          // Si ya está el permiso, lo quitamos
          permisoNivel.acciones = permisoNivel.acciones.filter(id => id !== permisoId);
        } else {
          // Si no está, lo agregamos
          permisoNivel.acciones.push(permisoId);
        }
      }
    },
    agregarRol: (state) => {
      state.creandoRol = true;
      state.roles.push(state.rolEnCreacion);

      // Reiniciar el rol en creación después de agregar
      state.rolEnCreacion = {
        id: '',
        rol: '',
        descripcion: '',
        departamentos: [],
        permisos: [
          { nombre: "Propio", color: "primary", acciones: [] },
          { nombre: "Departamento", color: "#c44b00", acciones: [] },
          { nombre: "Facultad", color: "#0055a4", acciones: [] },
        ],
      };
      state.creandoRol = false;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setCreandoRol: (state, action) => {
      state.creandoRol = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRol, setDescripcion, manejarPermiso, agregarRol, setRoles, setCreandoRol } = rolSlice.actions;
