import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const {permisosAcciones, acciones} = useSelector((state) => state.permiso);
  console.log('permisosAcciones:', permisosAcciones);
  console.log('acciones:', acciones);
  
  return (
  <div>
    PermisosInfo
    <Card
    sx={{display:{xs:"blck", md:"flex"}}}
    >
        <CardContent
        sx={{backgroundColor:"blue", flex:"2"}}
        >
             <Typography variant="body1">hola</Typography>
        </CardContent>
        <CardContent
        
        sx={{backgroundColor:"white"}}
        >
             <Typography variant="body1">hola</Typography>
        </CardContent>
    </Card>
  </div>
  );
};
