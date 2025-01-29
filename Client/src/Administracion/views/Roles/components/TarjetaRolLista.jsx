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

export const TarjetaRolLista = ({
  rol = "",
  descripcion = "",
  permisos = [],
  departamentos = [],
  horizontal = false,
  usado = false,
}) => {
  const dispatch = useDispatch();
  const { facultades } = useSelector((state) => state.rol);
  const [openPopup, setOpenPopup] = useState(false);

  const onBorrarRol = (rol) => {
    if (
      window.confirm(`¿Estás seguro de que deseas eliminar el rol "${rol}"?`)
    ) {
      dispatch(startDeletingRol(rol.trim())); // Trimear el nombre del rol
      setOpenPopup(true);
      setTimeout(() => setOpenPopup(false), 2500);
    }
  };

  return (
    <>
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

        {/* Sección de permisos */}
        <CardContent
          sx={{
            width: "100%",
            flex: 3,
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
        {!usado && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "10%",
              maxWidth: "100%",
            }}
          >
            <IconButton onClick={() => onBorrarRol(rol)}>
              <DeleteIcon sx={{ color: "red", width: "100%" }} />
            </IconButton>
          </Box>
        )}
        {usado && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              maxWidth: "10%",
            }}
          >
            <Typography
              textAlign="center"
              variant="h6"
              sx={{
                color: "black",
                fontSize: "0.9rem",
              }}
            >
              Rol con usuarios asignados (No se puede eliminar).
            </Typography>
          </Box>
        )}
      </Card>
      <PopUpEliminar
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        component="Rol"
      />
    </>
  );
};
