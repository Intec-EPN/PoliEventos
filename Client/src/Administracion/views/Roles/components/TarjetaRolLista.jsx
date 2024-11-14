import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { SeccionPermisos } from "../../Permisos/components/SeccionPermisos";
import { useDispatch } from "react-redux";
import { startDeletingRol } from "../../../../store/Administracion/Roles/thunks";
import DeleteIcon from "@mui/icons-material/Delete";

export const TarjetaRolLista = ({
  rol = "",
  descripcion = "",
  permisos = [],
  departamentos = [],
  horizontal = false,
  lista = false,
}) => {
  const dispatch = useDispatch();
  const onBorrarRol = (rol) => {
    dispatch(startDeletingRol(rol.trim())); // Trimear el nombre del rol
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        boxShadow: "10px 0px 30px rgba(0, 0, 0, 0.15)",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Contenido principal del rol y descripción */}
      <CardContent
        sx={{
          backgroundColor: "#004aad",
          color: "white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Typography textAlign="center" variant="h5" fontSize="1.8rem">
          {rol}
        </Typography>
        <Typography textAlign="justify">{descripcion}</Typography>
        <Grid2 container justifyContent="center" alignItems="center" mt={2}>
          {departamentos.map((dep, index) => (
            <Chip
              key={index}
              label={dep}
              variant="outlined"
              sx={{ backgroundColor: "#004aad", color: "white" }}
            />
          ))}
        </Grid2>
      </CardContent>

      {/* Sección de permisos */}
      <CardContent
        sx={{
          width: "100%",
          flex: 2,
          display: "flex",
          alignItems: "center",
          ml: 2,
        }}
      >
        <SeccionPermisos
          niveles={permisos}
          departamentos={departamentos}
          horizontal={horizontal}
        />
      </CardContent>

      {/* Icono de eliminar */}
      {lista && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <IconButton onClick={() => onBorrarRol(rol)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};
