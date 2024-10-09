import { Grid2 } from "@mui/material";
import { CategoriaPermiso } from "./CategoriaPermiso";

export const SeccionPermisos = ({ niveles, departamentos, align = false, separacion = 0 }) => {
  
  return (
    <>
      {niveles.map((nivel, index) => (
        <Grid2 container justifyContent="center" key={index}>
          <CategoriaPermiso
            {...nivel}
            align={align}
            separacion={separacion}
            departamentos = {departamentos}
          />
        </Grid2>
      ))}
    </>
  );
};
