import { Box, Button, Chip, Typography } from "@mui/material";
import SelectRoles from "./components/SelectRoles";
import SelectUsuarios from "./components/SelectUsuarios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startRolesUsuarios } from "../../../../store/Administracion/Usuarios/thunks";
import { limpiarAsignacion } from "../../../../store/Administracion/Usuarios/usuariosSlice";
import { PopUpAsignar } from "./components/PopUpAsignar";
import { useNavigate } from "react-router-dom";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

export const AsignarRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [asignacionCompleta, setAsignacionCompleta] = useState(false);
  const handleClose = () => setAsignacionCompleta(false);
  const { usuarioAsignar, rolesAsignar } = useSelector(
    (state) => state.usuarios
  );
  const { acciones } = useSelector((state) => state.permiso);
  const COLORES = {
    Propio: acciones[0].bgColor || "#FFF",
    Departamento: acciones[3].bgColor || "#FFF",
    Facultad: acciones[6].bgColor || "#FFF",
  };

  useEffect(() => {
    dispatch(limpiarAsignacion());
  }, [dispatch]);

  const handleButtonAsignar = () => {
    const usuarioId = usuarioAsignar;
    const rolesIds = rolesAsignar;
    dispatch(startRolesUsuarios(usuarioId, rolesIds));
    setAsignacionCompleta(true);
  };

  return (
    <Box ml={2} mt={2} width="97%">
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
        Instrucciones
      </Typography>
      <Box display={"flex"}>
        <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
          <Typography
            variant="p6"
            color="primary"
            sx={{ mb: 1, display: "inline-flex" }}
          >
            <LooksOneIcon /> Selecciona un usuario.
          </Typography>
          <Typography
            variant="p6"
            color="primary"
            sx={{ mb: 1, display: "inline-flex" }}
          >
            <LooksTwoIcon /> Selecciona los roles que deseas asignar.
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }} display={"flex"} flexDirection={"column"} gap={0.5}>
          <Box sx={{ width: "100%" }} display={"inline-flex"}>
            <HelpCenterIcon /> <strong>Roles</strong>
          </Box>
          <Box display={"flex"} gap={1} flexWrap={"wrap"}>
            <Chip
              label="Propio"
              sx={{ backgroundColor: COLORES.Propio, color: "#fff" }}
            />
            <Chip
              label="Departamento"
              sx={{ backgroundColor: COLORES.Departamento, color: "#fff" }}
            />
            <Chip
              label="Facultad"
              sx={{ backgroundColor: COLORES.Facultad, color: "#fff" }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "end", mt: 4 }}>
        <Box sx={{ width: "100%" }}>
          <LooksOneIcon />
          <SelectUsuarios />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LooksTwoIcon />
          <SelectRoles />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "25%" }}
          onClick={handleButtonAsignar}
          disabled={!usuarioAsignar || rolesAsignar.length === 0}
        >
          Guardar
        </Button>
      </Box>
      <PopUpAsignar open={asignacionCompleta} handleClose={handleClose} />
    </Box>
  );
};
