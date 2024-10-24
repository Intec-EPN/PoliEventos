import { Card, CardActionArea, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const {permisosAcciones, acciones} = useSelector((state) => state.permiso);
  console.log('permisosAcciones:', permisosAcciones);
  console.log('acciones:', acciones);
  
  return (
  <div>
    PermisosInfo
    <Card>
        <CardActionArea
        height="140"
        sx={{backgroundColor:"blue"}}
        >
             <Typography variant="body1">hola</Typography>
        </CardActionArea>
    </Card>
  </div>
  );
};
