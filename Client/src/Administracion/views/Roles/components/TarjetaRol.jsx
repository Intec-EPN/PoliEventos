import { Card, CardContent, Typography } from "@mui/material";
import { SeccionPermisos } from "../../Permisos/components/SeccionPermisos";

export const TarjetaRol = ({ rol = "", descripcion = "", permisos }) => {
  console.log(rol, descripcion, permisos )
  return (
    <>
      <Card
        sx={{
          borderRadius: "30px", 
          overflow: "hidden", 
        }}
      >
        <CardContent sx={{ backgroundColor: "#004aad", color: "white" }}>
          <Typography textAlign="center" variant="h4">
            {rol}
          </Typography>
          <Typography textAlign="justify">{descripcion}</Typography>
        </CardContent>
        <CardContent sx={{ width: "100%", padding: 2 }}>
          <SeccionPermisos niveles={permisos} />
        </CardContent>
      </Card>
    </>
  );
};
