import { Box, Grid2 } from "@mui/material";
import { CategoriaPermiso } from "./CategoriaPermiso";

export const SeccionPermisos = ({
  niveles,
  departamentos,
  align = false,
  separacion = 0,
  horizontal = false
}) => {  
  return (
    <>
      {niveles.map((nivel, index) => (
        <Box container key={index} justifyContent="center" sx={{ flex: nivel.acciones && nivel.acciones.length > 0 ? (nivel.nombre === 'Propio' ? 1 : nivel.nombre === 'Departamento' ? 3 : nivel.nombre === 'Facultad' ? 3 : 0) : 0 }} >
          <CategoriaPermiso
            {...nivel}
            align={align}
            separacion={separacion}
            departamentos={departamentos}
            horizontal = {horizontal}
          />
        </Box>
      ))}
      
    </>
  );
};
