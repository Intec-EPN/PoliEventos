import { Box, Button, Typography } from "@mui/material";
import SelectRoles from "./components/SelectRoles";
import SelectUsuarios from "./components/SelectUsuarios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startRolesUsuarios } from "../../../../store/Administracion/Usuarios/thunks";
import { limpiarAsignacion } from "../../../../store/Administracion/Usuarios/usuariosSlice";

export const AsignarUsuarios = () => {
  const dispatch = useDispatch();
  const { usuarioAsignar, rolesAsignar } = useSelector(
    (state) => state.usuarios
  );
  useEffect(() => {
    dispatch(limpiarAsignacion());
  }, [dispatch]);

  const handleButtonAsignar = () => {
    const usuarioId = usuarioAsignar;
    const rolesIds = rolesAsignar;
    console.log(usuarioId, rolesIds);
    
    dispatch(startRolesUsuarios(usuarioId, rolesIds));
  };

  return (
    <Box ml={2} mt={2} width="97%">
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
        Instrucciones
      </Typography>
      <Typography variant="p6" color="primary" sx={{ mb: 1 }}>
        Selecciona un usuario para asignarle uno o más roles. Cuando selecciones
        los roles se mostrarán con el color según el mayor nivel que tenga de
        permisos que tenga el rol. Para más información sobre los permisos haz
        click <a href="/admin/permisos">aquí.</a>
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "end", mt: 4 }}>
        <SelectUsuarios />
        <SelectRoles />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "25%" }}
          onClick={handleButtonAsignar}
          disabled={!usuarioAsignar || rolesAsignar.length === 0}
        >
          Asignar
        </Button>
      </Box>
    </Box>
  );
};
