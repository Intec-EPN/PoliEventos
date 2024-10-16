import { Grid2, Typography } from "@mui/material";

export const CatTituloDescrip = ({categoriaActual, descripcion}) => {
  return (
    <Grid2
      container
      display="flex"
      flexDirection="column"
      sx={{mt: 1.5, mb: 1.5 }}
    >
      <Typography
        variant="h5"
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        {categoriaActual}
      </Typography>
      <Typography
        variant="p"
        color="primary"
        sx={{ fontWeight: 400 }}
      >
        {descripcion}
      </Typography>
    </Grid2>
  );
};
