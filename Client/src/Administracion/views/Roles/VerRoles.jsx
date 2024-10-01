import {
  Autocomplete,
  createFilterOptions,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { TarjetaRol } from "./components/TarjetaRol";
import { dept, permisos, roles } from "../permisos";
import { Filtro } from "./components/Filtro";

const rolesPrueba = roles;
const deptPrueba = dept;


const obtenerAccionesDePermisos = (permisos) => {
  return Object.values(permisos).flatMap(permiso => permiso.acciones);
};
const permisosPrueba = obtenerAccionesDePermisos(permisos).map(element =>  element.accion + ' : ' + element.tooltip.split(' ')[element.tooltip.split(' ').length-1]);

export const VerRoles = ({ roles = rolesPrueba }) => {
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
          <Filtro opciones={deptPrueba} filtro="Departamento" size={200}/>
          <Filtro opciones={permisosPrueba} filtro="Nivel" size={350}/>
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
