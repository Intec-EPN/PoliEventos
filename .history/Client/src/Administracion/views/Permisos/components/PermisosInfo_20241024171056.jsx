import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  console.log("permisosAcciones:", permisosAcciones);
  console.log("acciones:", acciones);

  return (
    <div>
      PermisosInfo
      <Card
        sx={{
          display: { xs: "blck", md: "flex" },
          width: { xs: "100%", md: "70%" },
        }}
      >
        <CardContent
          // TODO
          // En el color iría el color del permiso.
          sx={{ backgroundColor: "blue", color:"white" ,flex: "3" }}
        >
          {/* //TODO
            // En el hola iría el permiso */}
          <Typography variant="body1">hola</Typography>
        </CardContent>
        <CardContent sx={{ backgroundColor: "white", flex: "7" }}>
          <Typography variant="body1">hola</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
