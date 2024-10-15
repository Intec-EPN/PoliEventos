import { Card, CardContent, Typography } from "@mui/material";
import { SeccionPermisos } from "../../Permisos/components/SeccionPermisos";

export const TarjetaRol = ({ rol = "", descripcion = "", permisos=[], departamentos=[] }) => {
    return (
    <>
      <Card
        sx={{
          borderRadius: "30px", 
          overflow: "hidden", 
          maxWidth: "400px",
          width: "100%", 
        }}
      >
        <CardContent sx={{ backgroundColor: "#004aad", color: "white" }}>
          <Typography textAlign="center" variant="h4">
            {rol}
          </Typography>
          <Typography textAlign="justify" >{descripcion}</Typography>
        </CardContent>
        <CardContent sx={{ width: "100%", padding: 2 }}>
          <SeccionPermisos niveles={permisos} departamentos={departamentos}/>
        </CardContent>
      </Card>
    </>
  );
};
