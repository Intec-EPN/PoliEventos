import { Box } from "@mui/material";
import { FormRol } from "./components/Crear/FormRol";
import { VistaPrevia } from "./components/Crear/VistaPrevia";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { reiniciarRol } from "../../../store/Administracion/Roles/rolSlice";
import { opcionActual } from "../../../store/Administracion/administracionSlice";
import { SnackBarSuccess } from "./components/Crear/SnackBarSuccess";

export const CrearRol = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reiniciarRol());
    dispatch(opcionActual('Crea un Rol'));
  }, [dispatch]);

  // Estado para el Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display={{ md: "flex", xs: "block" }}
      padding={2}
      gap={1}
      sx={{ height: "100vh" }}
    >
      <Box flex={4}>
        <FormRol setSnackbarOpen={setSnackbarOpen} />
      </Box>
      <hr />
      <Box flex={2}>
        <VistaPrevia />
      </Box>
      <SnackBarSuccess
        open={snackbarOpen}
        message="Rol creado exitosamente!"
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};
