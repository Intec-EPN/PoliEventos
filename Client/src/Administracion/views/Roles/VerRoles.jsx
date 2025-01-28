import { Box, Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import { TarjetaRol } from "./components/TarjetaRol";
import { Filtro } from "./components/Lista/Filtro";
import { useDispatch, useSelector } from "react-redux";
// import { FiltroTag } from "./components/Lista/FiltroTag";
import { useEffect, useState } from "react";
import {
  startLoadingFacultades,
  startLoadingRoles,
} from "../../../store/Administracion/Roles/thunks";
import { opcionActual } from "../../../store/Administracion/administracionSlice";
import { TarjetaRolLista } from "./components/TarjetaRolLista";
import { useNavigate } from "react-router-dom";
import { IndicadoresRoles } from "./components/Lista/components/IndicadoresRoles";

export const VerRoles = () => {
  const navigate = useNavigate();
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
    dispatch(opcionActual("Lista de roles"));
  }, [dispatch]);

  const nombresFacultades = facultades.map((facultad) => facultad.nombre);

  // Estado para roles filtrados
  const [rolesFiltrados, setRolesFiltrados] = useState([]);

  // Función para filtrar los roles
  const filtrarRoles = (roles, filtros) => {
    // Si no hay filtros, devolver todos los roles
    if (!filtros || filtros.length === 0) {
      return roles;
    }
    return roles.filter((rol) => {
      if (rol.esFacultad) {
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

  const handleCrearRol = () => {
    navigate("/admin/roles/crear");
  };

  // Verificar si los datos están cargados
  const datosCargados = departamentos && facultades && roles;

  return (
    <>
      {datosCargados ? (
        <>
          <Box
            display={{ xs: "column", sm: "flex" }}
            flexDirection="row"
            width={{ xs: "95%", sm: "94%", lg: "98%" }}
            ml={2}
            mt={2}
            justifyContent={{ xs: "center", sm: "space-between" }}
            alignItems={"center"}
          >
            <IndicadoresRoles />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                display: "flex",
                height: 55,
                width: { xs: "100%", md: "15%" },
              }}
              onClick={handleCrearRol}
            >
              Crear Rol
            </Button>
          </Box>
          <Grid2
            container
            margin={2}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Box sx={{ display: { xs: "block", lg: "none" }, width: "100%" }}>
              <Grid2 container spacing={2}>
                {rolesFiltrados.map((rol, index) => (
                  <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
                    <TarjetaRol {...rol} id={index} lista={true} />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
            <Box sx={{ display: { xs: "none", lg: "block" }, width: "100%" }}>
              {rolesFiltrados.map((rol, index) => (
                <Grid2 key={index} size={{ xs: 4, sm: 12 }}>
                  <Box
                    my={2}
                    display={"flex"}
                    justifyContent={"center"}
                    width="100%"
                  >
                    <TarjetaRolLista {...rol} id={index} horizontal={true} />
                  </Box>
                </Grid2>
              ))}
            </Box>
          </Grid2>
        </>
      ) : (
        <Typography variant="h6" align="center" mt={4}>
          Cargando datos...
        </Typography>
      )}
    </>
  );
};
