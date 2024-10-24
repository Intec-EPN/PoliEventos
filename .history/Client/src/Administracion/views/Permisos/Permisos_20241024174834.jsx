import { Box, Typography } from "@mui/material";
import { SeccionPermisos } from "./components/SeccionPermisos";
import { useSelector } from "react-redux";
import { PermisosInfo } from "./components/PermisosInfo";

export const Permisos = () => {
  const {permisosAcciones: niveles} = useSelector((state) => state.permiso)
  return (
    <Box sx={{ mt: 2 }}>
      {/* <SeccionPermisos niveles={niveles} separacion={3}/> */}
      <PermisosInfo />
    </Box>
  );
};
