import { Grid2, Typography } from "@mui/material";
import { TarjetaRol } from "./components/TarjetaRol";
import { Filtro } from "./components/Lista/Filtro";
import { useDispatch, useSelector } from "react-redux";
import { FiltroTag } from "./components/Lista/FiltroTag";
import { useEffect, useState } from "react";
import { startLoadingRoles } from "../../../store/Administracion/Roles/thunks";

export const VerRoles = () => {
  // Obtengo los departamentos.
  const { departamentos } = useSelector((state) => state.departamento);
  // Obtengo los permisos.
  const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  // Obtengo los ROLES totales.
  const { roles } = useSelector((state) => state.rol);
  // Obtengo los filtros:
  const { filtros } = useSelector((state) => state.rol);

  // Traigo los roles
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingRoles());
  }, [dispatch]);
  
  

  // Estado para roles filtrados
  const [rolesFiltrados, setRolesFiltrados] = useState([]);

  // Función para filtrar los roles
  const filtrarRoles = (roles, filtros) => {
    // Si no hay filtros, devolver todos los roles
    if (!filtros || filtros.length === 0) {
      return roles;
    }
    return roles.filter((rol) => {
      const tieneDepartamento = filtros.some((filtro) =>
        rol.departamentos.includes(filtro)
      );
      const tienePermisos = rol.permisos.some((permiso) =>
        permiso.acciones.some((accion) => filtros.includes(accion))
      );

      // Se muestra el rol si tiene al menos un departamento o un permiso que coincide con los filtros
      return tieneDepartamento || tienePermisos;
    });
  };

  // Se llama cada que cambian los filtros o los roles
  useEffect(() => {
    const rolesFiltrados = filtrarRoles(roles, filtros);
    setRolesFiltrados(rolesFiltrados);
  }, [filtros, roles]);

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
        <Grid2 container display="flex" gap={2} alignItems="center">
          <Filtro opciones={departamentos} filtro="Departamento" size={360} />
          <FiltroTag permisosAcciones={permisosAcciones} acciones={acciones} />
        </Grid2>
      </Grid2>
      <Grid2
        container
        margin={2}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {rolesFiltrados.map((rol, index) => (
          <Grid2 key={index} size={{ xs: 4, sm: 4 }}>
            <TarjetaRol {...rol} id={index} lista={true}/>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
