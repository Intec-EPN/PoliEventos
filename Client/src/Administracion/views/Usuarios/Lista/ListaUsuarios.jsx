import { Box, Typography } from "@mui/material";
import { TablaUsuarios } from "./components/TablaUsuarios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { opcionActual } from "../../../../store/Administracion/administracionSlice";

export const ListaUsuarios = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(opcionActual("Lista de usuarios"));
  }, [dispatch]);

  return (
    <Box ml={2} mt={2} width="97%">
      <TablaUsuarios />
    </Box>
  );
};
