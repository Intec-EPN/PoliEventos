import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { SeccionPermisos } from "../../Permisos/components/SeccionPermisos";
import { useDispatch } from "react-redux";
import { startDeletingRol } from "../../../../store/Administracion/Roles/thunks";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";

export const TarjetaRol = ({
  rol = "",
  descripcion = "",
  permisos = [],
  departamentos = [],
  lista = false,
}) => {
  const dispatch = useDispatch();
  const onBorrarRol = (rol) => {
    dispatch(startDeletingRol(rol.trim())); // Trimear el nombre del rol
  };
  
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
          {lista && (
            <Box display="flex" justifyContent="end">
              <IconButton onClick={() => onBorrarRol(rol)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          )}
          <Typography textAlign="center" variant="h4">
            {rol}
          </Typography>
          <Typography textAlign="justify">{descripcion}</Typography>
        </CardContent>
        <CardContent sx={{ width: "100%", padding: 2 }}>
          <SeccionPermisos niveles={permisos} departamentos={departamentos} />
        </CardContent>
      </Card>
    </>
  );
};
