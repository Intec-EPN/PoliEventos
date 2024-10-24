import { Grid2, Typography } from "@mui/material";

export const CrearCatTituloDescrip = ({ nombre, descripcion }) => {
  return (
    <Grid2
      container
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ mt: 1.5, mb: 1.5 }}
    >
      <Typography variant="h5" color="#2c4175" mb={1} sx={{fontWeight:"700"}}>
        Información general
      </Typography>

      {/* Mostrar el nombre */}
      <Typography variant="p" sx={{fontSize:"1.2rem"}}>
        <strong>Nombre:</strong> {nombre}
      </Typography>

      {/* Mostrar la descripción */}
      <Typography variant="p" sx={{fontSize:"1.2rem"}}>
        <strong>Descripción:</strong> {descripcion}
      </Typography>
    </Grid2>
  );
};
