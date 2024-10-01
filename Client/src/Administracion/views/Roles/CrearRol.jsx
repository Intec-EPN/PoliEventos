import { Box, Slide } from "@mui/material";
import { FormRol } from "./components/FormRol";
import { VistaPrevia } from "./components/VistaPrevia";

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
