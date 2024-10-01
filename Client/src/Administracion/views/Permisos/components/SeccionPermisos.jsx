import { Grid2 } from "@mui/material";
import React from "react";
import { CategoriaPermiso } from "./CategoriaPermiso";

export const SeccionPermisos = ({niveles, align = false, separacion = 0}) => {
  return (
    <>
      <Grid2
        container
        justifyContent="center"
      >
        <CategoriaPermiso {...niveles.Propio} align={align} separacion={separacion}/>
      </Grid2>

      {/* //Nivel Departamento */}
      <Grid2
        container
        justifyContent="center"
      >
        <CategoriaPermiso {...niveles.Departamento} align={align} separacion={separacion}/>
      </Grid2>
      {/* //Nivel Facultad */}
      <Grid2
        container
        justifyContent="center"
      >
        <CategoriaPermiso {...niveles.Facultad} align={align} separacion={separacion}/>
      </Grid2>
    </>
  );
};
