import { Box } from "@mui/material";
import { FormRol } from "./components/Crear/FormRol";
import { VistaPrevia } from "./components/Crear/VistaPrevia";

export const CrearRol = () => {
  return (
    <Box
      display={{ md: "flex", xs: "block" }}
      padding={2}
      gap={1}
      sx={{ height: "100vh" }}
    >
      <Box flex={4}>
        <FormRol/>
      </Box>
      <hr/>
      <Box flex={2}>
        <VistaPrevia/>
      </Box>
    </Box>
  );
};
