import { Box, Typography } from "@mui/material";
import { ListaCategorias } from "./components/ListaCategorias";
import { useParams } from "react-router-dom";

export const Categorizaciones = ({ action }) => {
  const resp = useParams();
  return (
    <Box ml={3} mr={3}>
      <Typography
        variant="h6"
        color="primary"
        sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}
      >
        {
          action === "edit" ? `Editando ${resp.categoria}` :"Categorías"
        }
      </Typography>
      <ListaCategorias />
    </Box>
  );
};
