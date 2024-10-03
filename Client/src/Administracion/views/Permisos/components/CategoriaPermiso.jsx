import { Grid2, Typography } from "@mui/material";
import { SeleccionarDept } from "../../Roles/components/Crear/SeleccionarDept";
import { ChipPermiso } from "./ChipPermiso";
import { acciones } from "../../permisos";

export const CategoriaPermiso = ({
  nombre = "",
  color = "",
  acciones: idsAcciones = [],
  clickable = false,
  align = false,
  dept = false,
  separacion = 0,
  onPermisoClick,
}) => {
  return (
    <Grid2 sx={{ mb: separacion }}>
      {idsAcciones.length === 0 ? null : (
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
          textAlign={align ? "left" : "center"}
        >
          NIVEL {nombre.toUpperCase()}
        </Typography>
      )}

      {dept ? <SeleccionarDept /> : null}
      <Grid2 container display="flex" justifyContent="center">
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
