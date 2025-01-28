import { Box } from "@mui/material";
import { FormRol } from "./components/Crear/FormRol";
import { VistaPrevia } from "./components/Crear/VistaPrevia";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { handleSeleccion, reiniciarRol } from "../../../store/Administracion/Roles/rolSlice";
import { opcionActual } from "../../../store/Administracion/administracionSlice";
import { startLoadingFacultades } from "../../../store/Administracion/Roles/thunks";

export const CrearRol = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reiniciarRol());
    dispatch(opcionActual("Crea un rol"));
    dispatch(startLoadingFacultades())
  }, [dispatch]);
  useEffect(() => {
    handleSeleccion("Departamento");
  }, []);

  return (
    <Box display={{ md: "flex", xs: "block" }} padding={2} gap={1}>
      <Box flex={4}>
        <FormRol />
      </Box>
      <hr />
      <Box flex={2}>
        <VistaPrevia />
      </Box>
    </Box>
  );
};
