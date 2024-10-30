import { Chip, Grid2, Icon, Typography } from "@mui/material";
import { ChipPermiso } from "./ChipPermiso";
import { useSelector } from "react-redux";

// Iconos
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const CategoriaPermiso = ({
  nombre = "",
  color = "",
  icono = "",
  acciones: idsAcciones = [],
  clickable = false,
  align = false,
  separacion = 0,
  onPermisoClick,
  departamentos = [],
}) => {
  const { acciones } = useSelector((state) => state.permiso);

  // Mapeo de nombres de íconos a los componentes de ícono
  const iconosMap = {
    PersonIcon: <PersonIcon />,
    ApartmentIcon: <ApartmentIcon />,
    AccountBalanceIcon: <AccountBalanceIcon />,
  };

  // console.log(icono);

  return (
    <Grid2 sx={{ mb: separacion }}>
      {idsAcciones.length === 0 ? null : (
        <Grid2 container display="flex" gap={1} justifyContent = {align ? "left" : "center"}>
          <Icon>{iconosMap[icono] || null}</Icon>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            NIVEL {nombre.toUpperCase()}
          </Typography>
        </Grid2>
      )}

      {departamentos.length > 0 && nombre === "Departamento" ? (
        <Grid2 container display="flex" justifyContent="center" mb={1}>
          {departamentos.map((dep, index) => (
            <Chip key={index} label={dep} variant="outlined" />
          ))}
        </Grid2>
      ) : null}
      <Grid2 container display="flex" justifyContent={align ? "left" : "center"}>
        {idsAcciones.map((id) => {
          // Busco el objeto desde mi tabla de acciones
          const item = acciones.find((accion) => accion.id === id);
          return (
            item && (
              <ChipPermiso
                key={item.id}
                {...item} // Esto pasará {id, accion, tooltip, bgColor}
                clickable={clickable}
                color={color}
                nombre={nombre}
                onPermisoClick={onPermisoClick}
              />
            )
          );
        })}
      </Grid2>
    </Grid2>
  );
};
