import { Box, Typography } from "@mui/material";
import { permisos } from "../permisos";
import { SeccionPermisos } from "./components/SeccionPermisos";

const niveles = permisos;

export const Permisos = () => {

  return (
    <Box sx={{ mt: 2 }}>
      <Typography  color="primary" pr={3} sx={{ml:2, display:"flex", textAlign:"justify"}} >
        <span style={{color:"#ff1744", marginRight:5}}>
          Tip: 
        </span>
          Ubica tu puntero sobre los permisos para obtener más información.
      </Typography>
      {/* //Nivel Propio */}
      <SeccionPermisos niveles={niveles} separacion={3}/>
    </Box>
  );
};
