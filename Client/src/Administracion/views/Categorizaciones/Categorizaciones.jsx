import { Box, Typography } from "@mui/material";
import { ListaCategorias } from "./components/ListaCategorias";

export const Categorizaciones = () => {
  return (
    <Box ml={3} mr={3}>
      <Typography
        variant="h6"
        color="primary"
        sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}
      >
        Categorizaciones
      </Typography>
      <ListaCategorias />
    </Box>
  );
};
