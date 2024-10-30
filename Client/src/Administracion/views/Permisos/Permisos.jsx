import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { PermisosInfo } from "./components/PermisosInfo";
import { opcionActual } from "../../../store/Administracion/administracionSlice";
import { useEffect } from "react";

export const Permisos = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(opcionActual('Permisos'));
  }, [dispatch]);
  return (
    <Box sx={{ mt: 2 }}>
      <PermisosInfo />
    </Box>
  );
};
