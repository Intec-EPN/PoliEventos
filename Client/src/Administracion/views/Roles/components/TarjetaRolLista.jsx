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
import { useEffect, useState } from "react";
import { puedeBorrarse } from "../../../../store/Administracion/Usuarios/usuariosSlice";

export const TarjetaRolLista = ({
  rol = "",
  descripcion = "",
  permisos = [],
  departamentos = [],
  horizontal = false,
}) => {
  const dispatch = useDispatch();
  const { usuarios } = useSelector((state) => state.usuarios);
  const [usado, setUsado] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [usuariosCargados, setUsuariosCargados] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (usuarios.length > 0) {
      const usado = usuarios.some(
        (usuario) =>
          usuario.roles.some((role) => role.rol_nombre === rol) || false
      );
      setUsado(usado);
      setUsuariosCargados(true);
    }
  }, [usuarios, rol]);

  if (!usuariosCargados) {
    return null; // No renderizar nada hasta que los usuarios estén cargados
  }

  const onBorrarRol = (rol) => {
    if (
      window.confirm(`¿Estás seguro de que deseas eliminar el rol "${rol}"?`)
    ) {
      dispatch(startDeletingRol(rol.trim())); // Trimear el nombre del rol
    }
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
      {isMounted && !usado ? (
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
      ) : (
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
            Rol se ha asignado (No se puede eliminar).
          </Typography>
        </Box>
      )}
    </Card>
  );
};
