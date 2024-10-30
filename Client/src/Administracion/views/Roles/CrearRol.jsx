import { Box } from "@mui/material";
import { FormRol } from "./components/Crear/FormRol";
import { VistaPrevia } from "./components/Crear/VistaPrevia";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { reiniciarRol } from "../../../store/Administracion/Roles/rolSlice";
import { opcionActual } from "../../../store/Administracion/administracionSlice";

export const CrearRol = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reiniciarRol());
    dispatch(opcionActual('Crear un Rol'));
  }, [dispatch]);
  
  return (
    <Box
      display={{ md: "flex", xs: "block" }}
      padding={2}
      gap={1}
      sx={{ height: "100vh" }}
    >
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
