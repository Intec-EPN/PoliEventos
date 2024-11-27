import { Box, Button, Chip, Typography } from "@mui/material";
import SelectRoles from "./components/SelectRoles";
import SelectUsuarios from "./components/SelectUsuarios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startRolesUsuarios } from "../../../../store/Administracion/Usuarios/thunks";
import { limpiarAsignacion } from "../../../../store/Administracion/Usuarios/usuariosSlice";
import { PopUpAsignar } from "./components/PopUpAsignar";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { resetSelectUsuarios } from "./components/SelectUsuarios";
import { resetSelectRoles } from "./components/SelectRoles";
import React from "react";

export const AsignarRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [asignacionCompleta, setAsignacionCompleta] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);

  const handleClose = () => {
    setAsignacionCompleta(false);
    setResetSelect(true);
    setTimeout(() => setResetSelect(false), 0); // Resetear el estado después de un ciclo de renderizado
  };

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
    return () => {
      dispatch(limpiarAsignacion());
    };
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
      <Box display={"flex"} mb={5}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ width: "100%" }}
          flex={3}
        >
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
        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={0.5}
          flex={4}
          ml={3}
        >
          <Box display={"inline-flex"}>
            <HelpCenterIcon /> <strong>Roles</strong>
          </Box>
          {/* TODO ALINACION */}
          <Box display="flex" gap="2rem">
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              flexWrap={"wrap"}
            >
              <div>
                <Chip
                  label="Propio"
                  sx={{
                    backgroundColor: COLORES.Propio,
                    color: "#fff",
                    width: "auto",
                  }}
                />
              </div>
              <div>
                <Chip
                  label="Departamento"
                  sx={{
                    backgroundColor: COLORES.Departamento,
                    color: "#fff",
                    width: "auto",
                  }}
                />
              </div>
              <div>
                <Chip
                  label="Facultad"
                  sx={{
                    backgroundColor: COLORES.Facultad,
                    color: "#fff",
                    width: "auto",
                  }}
                />
              </div>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              flexWrap={"wrap"}
            >
              <Typography
                variant="p6"
                color="primary"
                sx={{ mb: 1, display: "inline-flex" }}
              >
                Roles a nivel propio de gestión de eventos.
              </Typography>
              <Typography
                variant="p6"
                color="primary"
                sx={{ mb: 1, display: "inline-flex" }}
              >
                Roles a nivel de departamento de gestión de eventos (uno o más
                por departamento).
              </Typography>
              <Typography
                variant="p6"
                color="primary"
                sx={{ mb: 1, display: "inline-flex" }}
              >
                Roles a nivel de facultad de gestión de eventos (uno o más por
                facultad).
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ width: "90%" }}>
        <Chip label="Asigna" size="small" />
      </Divider>
      <Box sx={{ display: "flex", gap: 2, alignItems: "end", mt: 4 }}>
        <Box sx={{ width: "100%" }}>
          <LooksOneIcon />
          <SelectUsuarios reset={resetSelect} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LooksTwoIcon />
          <SelectRoles reset={resetSelect} />
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
