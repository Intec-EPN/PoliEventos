import {
  Box,
  Chip,
  Grid2,
  Icon,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
  horizontal = true,
  nivelSeleccionado, // Añadir esta nueva prop
}) => {
  const { acciones } = useSelector((state) => state.permiso);

  // Mapeo de nombres de íconos a los componentes de ícono
  const iconosMap = {
    PersonIcon: <PersonIcon />,
    ApartmentIcon: <ApartmentIcon />,
    AccountBalanceIcon: <AccountBalanceIcon />,
  };

  return (
    <>
      {horizontal ? (
        <>
          <Box sx={{ display: "flex", width: "100%", flex:"1" }}>
            <Box>
              {idsAcciones.length > 0 ? (
                <>
                  <Box sx={{display:"flex"}}>
                    <Icon sx={{mr:1}}>{iconosMap[icono] || null}</Icon>
                    <Typography
                      width="100%"
                      variant="h6"
                      noWrap
                      component="div"
                      color="primary"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      NIVEL {nombre.toUpperCase()}
                    </Typography>
                  </Box>
                  <Grid2 justifyContent={align ? "left" : "center"} width="100%">
                    {idsAcciones.map((id) => {
                      // Busco el objeto desde mi tabla de acciones
                      const item = acciones.find((accion) => accion.id === id);
                      return (
                        item && (
                          <ChipPermiso
                            key={item.id}
                            {...item}
                            clickable={clickable}
                            color={color}
                            nombre={nombre}
                            onPermisoClick={onPermisoClick}
                            nivelSeleccionado={nivelSeleccionado} // Pasar la nueva prop
                          />
                        )
                      );
                    })}
                  </Grid2>
                </>
              ) : (
                <Box sx={{ margin: 0, padding: 0 }}></Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Grid2 sx={{ mb: separacion }}>
          {idsAcciones.length === 0 ? null : (
            <Grid2
              container
              display="flex"
              flex="row"
              gap={1}
              justifyContent={align ? "left" : "center"}
            >
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

          <Grid2
            container
            display="flex"
            justifyContent={align ? "left" : "center"}
          >
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
                    nivelSeleccionado={nivelSeleccionado} // Pasar la nueva prop
                  />
                )
              );
            })}
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
