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
      permisos: [],
    },
    creandoRol: false,
    seleccionNivel: 'Departamento',
    filtros: [],
    estructuraPermisos: []
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
    setDepartamento: (state, action) => {
      state.creandoRol = true;
      if (state.seleccionNivel === 'Departamento') {
        state.rolEnCreacion.departamentos = [];
        state.rolEnCreacion.departamentos.push(action.payload);
      } else {
        state.rolEnCreacion.departamentos = action.payload;
      }
    },
    setFiltro: (state, action) => {
      if (state.filtros.includes(action.payload)) {
        // Existe, lo elimino
        state.filtros = state.filtros.filter(filt => filt !== action.payload)
      } else {
        state.filtros.push(action.payload);
      }
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
      };
      // Reiniciar permisos
      state.rolEnCreacion.permisos = state.estructuraPermisos;
      state.creandoRol = false;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setCreandoRol: (state, action) => {
      state.creandoRol = action.payload;
    },
    handleSeleccion: (state, action) => {
      state.seleccionNivel = action.payload;
      // Reiniciar permisos
      state.rolEnCreacion.permisos = state.estructuraPermisos;
    },
    setPermisos: (state, action) => {
      state.rolEnCreacion.permisos = action.payload;
      state.estructuraPermisos = action.payload;
      // Seteo la estructura de permisos inicialmente desde la base, esto para tener los colores configurados.
      // { nombre: "Propio", color: "primary", acciones: [] },
      // { nombre: "Departamento", color: "#c44b00", acciones: [] },
      // { nombre: "Facultad", color: "#bd0000", acciones: [] },

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRol,
  setDescripcion,
  setDepartamento,
  setFiltro,
  manejarPermiso,
  agregarRol,
  setRoles,
  setCreandoRol,
  handleSeleccion,
  setPermisos
} = rolSlice.actions;

