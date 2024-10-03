import { Box, Typography } from "@mui/material";
import { TarjetaRol } from "../TarjetaRol";
import { useSelector } from "react-redux";

export const VistaPrevia = () => {

  const {rolEnCreacion} = useSelector(state => state.rol)

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
      <TarjetaRol { ... rolEnCreacion }/>
    </Box>
  );
};
