import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
  name: 'rol',
  initialState: {
    roles: [], // Array con todos los roles que existen.
    facultades: [],
    rolEnCreacion: {
      rol: '',
      descripcion: '',
      facultad_id: 1,
      departamentos: [],
      permisos: [],
    },
    creandoRol: false,
    creandoRolEnBase: false,
    seleccionNivel: 'Departamento',
    filtros: [],
    estructuraPermisos: [],
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
        // Asegúrate de que sea un arreglo y agrega el nuevo departamento
        state.rolEnCreacion.departamentos = [action.payload];
      } else {
        // En caso de que sea otro nivel, simplemente asigna un arreglo
        state.rolEnCreacion.departamentos = Array.isArray(action.payload) ? action.payload : [action.payload];
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
    reiniciarRol: (state) => {
      // Método solo para reiniciar el Rol cuando se lo crea.
      state.creandoRol = true;
      // Reiniciar el rol en creación después de agregar
      state.rolEnCreacion = {
        id: '',
        rol: '',
        descripcion: '',
        facultad_id: 1,
        departamentos: [],
      };
      // Reiniciar permisos
      state.rolEnCreacion.permisos = state.estructuraPermisos;
      state.creandoRol = false;
    },
    setRoles: (state, action) => {
      const roles = action.payload.filter(rol => rol.rol !== 'Administrador');
      state.roles = roles;
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
    },
    setCreandoRolEnBase: (state, action) => {
      state.creandoRolEnBase = action.payload;
    },
    resetDepartamentos: (state) => {
      state.rolEnCreacion.departamentos = [];
    },
    setFacultades: (state, action) => {
      state.facultades = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setRol,
  setDescripcion,
  setDepartamento,
  setFiltro,
  manejarPermiso,
  reiniciarRol,
  setRoles,
  setCreandoRol,
  handleSeleccion,
  setPermisos,
  setCreandoRolEnBase,
  resetDepartamentos,
  setFacultades
} = rolSlice.actions;

