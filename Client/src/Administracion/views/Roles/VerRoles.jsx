import {
  Grid2,
  Typography,
} from "@mui/material";
import { TarjetaRol } from "./components/TarjetaRol";
import { Filtro } from "./components/Lista/Filtro";
import { useSelector } from "react-redux";

// TODO CAMBIAR POR SLICE ACCIONES Y DEPT
// TODO Hacer Slice para recuperar acciones y slice para recuperar departamentos.
import { acciones, dept, permisos } from "../permisos";
console.log(acciones, dept, permisos);

const deptPrueba = dept;


// Obtener acciones basadas en los IDs de permisos
const obtenerAccionesDePermisos = (permisos, acciones) => {
  return Object.values(permisos).flatMap(permiso =>
    permiso.acciones.map(id => acciones.find(accion => accion.id === id))
  );
};

// Obtenemos las acciones completas y formateamos para el filtro
const permisosPrueba = obtenerAccionesDePermisos(permisos, acciones).map(accion => 
  `${accion.accion} : ${accion.tooltip.split(' ').slice(-1)[0]}`
);

export const VerRoles = () => {
  
  const resp = useSelector( state => state.rol );
  const roles = resp.roles;  
  return (
    <>
      <Grid2 container ml={2} mt={2} display="flex" flexDirection="column">
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Filtro
        </Typography>
        <Grid2 container display="flex" gap={2}>
          <Filtro opciones={deptPrueba} filtro="Departamento" size={200} />
          <Filtro opciones={permisosPrueba} filtro="Nivel" size={350} />
        </Grid2>
      </Grid2>
      <Grid2
        container
        margin={2}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {roles.map((rol, index) => (
          <Grid2 key={index} size={{ xs: 4, sm: 4 }}>
            <TarjetaRol {...rol} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
