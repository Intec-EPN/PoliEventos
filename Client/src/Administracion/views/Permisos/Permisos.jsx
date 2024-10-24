import { Box, Typography } from "@mui/material";
import { SeccionPermisos } from "./components/SeccionPermisos";
import { useSelector } from "react-redux";
import { PermisosInfo } from "./components/PermisosInfo";

export const Permisos = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <PermisosInfo />
    </Box>
  );
};
