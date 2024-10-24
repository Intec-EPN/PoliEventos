import { useSelector } from "react-redux";
import { PermisoInfoCard } from "./PermisoInfoCard";
import { Box } from "@mui/material";

export const PermisosInfo = () => {
  const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  console.log("permisosAcciones:", permisosAcciones);
  console.log("acciones:", acciones);

  return (
    <>
      {acciones.map((acc) => (
        <Box>
          <PermisoInfoCard
            permiso={acc.accion}
            tooltip={acc.tooltip}
            bgColor={acc.bgColor}
            colorLetra={"white"}
          />
        </Box>
      ))}
    </>
  );
};
