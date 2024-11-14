import { Box, Typography } from "@mui/material";
import { ListaCategorias } from "./components/ListaCategorias";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startLoadingEsquemas } from "../../../store/Administracion/Categorizacion/thunks";
import { opcionActual } from "../../../store/Administracion/administracionSlice";
import { Indicadores } from "./components/tipos/Indicadores";

export const Categorizaciones = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(opcionActual("Categorizaciones"));
    dispatch(startLoadingEsquemas());
  }, [dispatch]);

  return (
    <Box ml={3} mr={3}>
      <Indicadores value={"una categorización"} editar={true} />
      <ListaCategorias />
    </Box>
  );
};
