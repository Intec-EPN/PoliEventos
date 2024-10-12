import { Chip, Grid2, Typography } from "@mui/material";
import { SeleccionarDept } from "../../Roles/components/Crear/SeleccionarDept";
import { ChipPermiso } from "./ChipPermiso";
import { useSelector } from "react-redux";



export const CategoriaPermiso = ({
  nombre = "",
  color = "",
  acciones: idsAcciones = [],
  clickable = false,
  align = false,
  dept = false,
  separacion = 0,
  onPermisoClick,
  departamentos = [],
}) => {

  const { acciones } = useSelector((state) => state.permiso);
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
      {
        departamentos.length > 0 && nombre === "Departamento" 
      ? 
      <Grid2 container display="flex" justifyContent="center" mb={1}>
        {
          departamentos.map((dep, index) => (
            <Chip key={index} label={dep} variant="outlined"/>
          ))
        }
      </Grid2>
      : 
        null
      }
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
