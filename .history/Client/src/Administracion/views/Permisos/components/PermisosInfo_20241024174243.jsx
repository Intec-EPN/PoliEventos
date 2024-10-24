import { useSelector } from "react-redux";
import { PermisoInfoCard } from "./PermisoInfoCard";
import { Box, Icon, Typography } from "@mui/material";
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

  const aux = acciones.filter((acc) => acc.nivel_id == 2);
  console.log('debug', aux);

  return (
    <>
      {permisosAcciones.map((nivelPermiso, id) => (
        <Box container display="flex" gap={1}>
          <Icon>{iconosMap[nivelPermiso.icono] || null}</Icon>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            NIVEL {nivelPermiso.nombre.toUpperCase()}
          </Typography>
          {/* {acciones
            .filter((acc) => (acc.nivel_id == (id)))
            .map((acc) => (
              <Box key={acc.id}>
                <PermisoInfoCard
                  permiso={acc.accion}
                  tooltip={acc.tooltip}
                  bgColor={acc.bgColor}
                  colorLetra={"white"}
                />
              </Box>
            ))} */}
        </Box>
      ))}

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
