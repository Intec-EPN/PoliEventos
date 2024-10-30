import { Grid2, Typography } from "@mui/material";
import { TarjetaRol } from "./components/TarjetaRol";
import { Filtro } from "./components/Lista/Filtro";
import { useDispatch, useSelector } from "react-redux";
import { FiltroTag } from "./components/Lista/FiltroTag";
import { useEffect, useState } from "react";
import { startLoadingFacultades, startLoadingRoles } from "../../../store/Administracion/Roles/thunks";
import { opcionActual } from "../../../store/Administracion/administracionSlice";

export const VerRoles = () => {
  // Obtengo los departamentos.
  const { departamentos } = useSelector((state) => state.departamento);

  // Para usar en caso de tener filtro por permisos.
  // Obtengo los permisos.
  // const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  // Obtengo todos los roles y las facultades.
  const { roles, facultades, filtros } = useSelector((state) => state.rol);

  // Traigo los roles
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingRoles());
    dispatch(startLoadingFacultades());
    dispatch(opcionActual('Lista de Roles'));
  }, [dispatch]);
  
  const nombresFacultades = facultades.map(facultad => facultad.nombre);
  

  // Estado para roles filtrados
  const [rolesFiltrados, setRolesFiltrados] = useState([]);

  // Función para filtrar los roles
  const filtrarRoles = (roles, filtros) => {
    // Si no hay filtros, devolver todos los roles
    if (!filtros || filtros.length === 0) {
      return roles;
    }
    return roles.filter((rol) => {

      if(rol.esFacultad) {
        const tieneFacultad = filtros.some((filtro) => rol.facultad === filtro);
        return tieneFacultad;
      }

      const tieneDepartamento = filtros.some((filtro) =>
        rol.departamentos.includes(filtro)
      );

      // Para verificar permisos acciones en caso de tener activo el componente FiltroTag.
      // const tienePermisos = rol.permisos.some((permiso) =>
      //   permiso.acciones.some((accion) => filtros.includes(accion))
      // );

      // Se muestra el rol si tiene al menos un departamento o un permiso que coincide con los filtros
      return tieneDepartamento;
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
          <Filtro opciones={nombresFacultades} filtro="Facultad" size={360} />
          {/* Filtro para permisos y acciones (en funcionamiento pero fuera de requerimientos). */}
          {/* <FiltroTag permisosAcciones={permisosAcciones} acciones={acciones} /> */}
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
