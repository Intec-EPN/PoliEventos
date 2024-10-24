import { useSelector } from "react-redux";
import { PermisoInfoCard } from "./PermisoInfoCard";
import { Box } from "@mui/material";
// Iconos
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";


export const PermisosInfo = () => {
  const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  console.log("permisosAcciones:", permisosAcciones);
  console.log("acciones:", acciones);

  const iconosMap = {
    PersonIcon: <PersonIcon />,
    ApartmentIcon: <ApartmentIcon />,
    AccountBalanceIcon: <AccountBalanceIcon />,
  };

  return (
    <>
      {acciones.map((acc) => (
        <Box key={acc.id}>
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
