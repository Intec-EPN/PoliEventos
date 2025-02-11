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
import { useDispatch, useSelector } from "react-redux";
import { startDeletingRol } from "../../../../store/Administracion/Roles/thunks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import PopUpEliminar from "../../../components/PopUpEliminar";

export const TarjetaRol = ({
  rol = "",
  descripcion = "",
  permisos = [],
  departamentos = [],
  lista = false,
  usado = false,
}) => {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);

  const onBorrarRol = (rol) => {
    dispatch(startDeletingRol(rol.trim())); // Trimear el nombre del rol
    setOpenPopup(true);
    setTimeout(() => setOpenPopup(false), 2500);
  };

  const { facultades } = useSelector((state) => state.rol);

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
          {lista && !usado && (
            <Box display="flex" justifyContent="center">
              <IconButton onClick={() => onBorrarRol(rol)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          )}
          {usado && (
            <Typography
              textAlign="center"
              variant="h6"
              sx={{ color: "#eff5ff", fontSize: "0.9rem" }}
            >
              Rol con usuarios asignados (No se puede eliminar).
            </Typography>
          )}
          <Typography textAlign="center" variant="h4">
            {rol}
          </Typography>
          <Typography textAlign="justify">{descripcion}</Typography>
          <Grid2 container justifyContent="center" alignItems="center" mt={2}>
            {departamentos.length > 1 ? (
              facultades && facultades[0] ? (
                <Chip
                  label={facultades[0].nombre}
                  variant="outlined"
                  sx={{ backgroundColor: "#004aad", color: "white" }}
                />
              ) : null
            ) : (
              departamentos.map((dep, index) => (
                <Chip
                  key={index}
                  label={dep}
                  variant="outlined"
                  sx={{ backgroundColor: "#004aad", color: "white" }}
                />
              ))
            )}
          </Grid2>
        </CardContent>
        <CardContent sx={{ width: "100%", padding: 2 }}>
          <SeccionPermisos niveles={permisos} departamentos={departamentos} />
        </CardContent>
      </Card>
      <PopUpEliminar
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        component="Rol"
      />
    </>
  );
};
