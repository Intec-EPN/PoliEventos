import { Card } from "@mui/material";
import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const {permisosAcciones, acciones} = useSelector((state) => state.permiso);
  console.log('permisosAcciones:', permisosAcciones);
  console.log('acciones:', acciones);
  
  return (
  <div>
    PermisosInfo
    <Card>
        
    </Card>
  </div>
  );
};
