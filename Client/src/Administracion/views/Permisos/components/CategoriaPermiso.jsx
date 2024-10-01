import { Grid2, Typography } from "@mui/material";
import { SeleccionarDept } from "../../Roles/components/seleccionarDept";
import { ChipPermiso } from "./ChipPermiso";

export const CategoriaPermiso = ({
  nombre = "",
  color = "",
  acciones = [],
  clickable = false,
  align = false,
  dept = false,
  separacion = 0,
}) => {
  return (
    <Grid2 sx={{ mb: separacion }}>
      {acciones.length === 0 ? null : (
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
        {acciones.map((item) => {
          return (
            <ChipPermiso
              key={item.id}
              {...item}
              clickable={clickable}
              color={color}
            />
          );
        })}
      </Grid2>
    </Grid2>
  );
};
