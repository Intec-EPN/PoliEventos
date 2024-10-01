import { Box, Typography } from "@mui/material";
import { TarjetaRol } from "./TarjetaRol";
import { rol } from "../../permisos";

const rolPrueba = rol;

export const VistaPrevia = () => {

  return (
    <Box sx={{ml:{md:4}}}>
      <Typography
        variant="h6"
        noWrap
        color="primary"
        sx={{ fontWeight: 700, mb: 1 }}
      >
        VISTA PREVIA
      </Typography>
      <TarjetaRol { ... rolPrueba }/>
    </Box>
  );
};
