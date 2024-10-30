import { Box, Typography } from "@mui/material";
import { ListaCategorias } from "./components/ListaCategorias";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startLoadingEsquemas } from "../../../store/Administracion/Categorizacion/thunks";
import { opcionActual } from "../../../store/Administracion/administracionSlice";

export const Categorizaciones = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(opcionActual('Categorizaciones'));
    dispatch(startLoadingEsquemas())  ;
  }, [dispatch]);

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
