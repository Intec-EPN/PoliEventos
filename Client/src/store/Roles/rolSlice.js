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
      permisos: {
        Propio: {
          nombre: "Propio",
          color: "primary",
          acciones: []
        },
        Departamento: {
          nombre: "Departamento",
          color: "#c44b00",
          acciones: []
        },
        Facultad: {
          nombre: "Facultad",
          color: "#0055a4",
          acciones: []
        }
      }
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
      const permisosNivel = state.rolEnCreacion.permisos[nivel].acciones

      if (permisosNivel.includes(permisoId)) {
        // Si ya está el permiso, lo quitamos, porque quiere decir que se lo estaba quitando.
        state.rolEnCreacion.permisos[nivel].acciones = permisosNivel.filter(id => id !== permisoId);
      } else {
        // si es que no está, entonces se lo estaba agregando.
        state.rolEnCreacion.permisos[nivel].acciones.push(permisoId);
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
        permisos: {
          Propio: {
            nombre: "Propio",
            color: "primary",
            acciones: []
          },
          Departamento: {
            nombre: "Departamento",
            color: "#c44b00",
            acciones: []
          },
          Facultad: {
            nombre: "Facultad",
            color: "#0055a4",
            acciones: []
          }
        }
      };
      state.creandoRol = false;
    },
    setCreandoRol: (state, action) => {
      state.creandoRol = action.payload
    }

  }
});

// Action creators are generated for each case reducer function
export const { setRol, setDescripcion, manejarPermiso, agregarRol, setCreandoRol } = rolSlice.actions;