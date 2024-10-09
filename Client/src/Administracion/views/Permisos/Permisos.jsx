import { Box, Typography } from "@mui/material";
import { SeccionPermisos } from "./components/SeccionPermisos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startLoadingPermisosAcciones } from "../../../store/Permisos/thunk";



export const Permisos = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingPermisosAcciones());
  }, [dispatch]);

  const {permisosAcciones: niveles} = useSelector((state) => state.permiso)
  

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
