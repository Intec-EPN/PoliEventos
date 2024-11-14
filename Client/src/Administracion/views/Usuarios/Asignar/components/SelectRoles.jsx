import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingRoles } from "../../../../../store/Administracion/Roles/thunks";
import { Box, Typography } from "@mui/material";
import { setRolesAsignar } from "../../../../../store/Administracion/Usuarios/usuariosSlice";

export default function SelectRoles() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startLoadingRoles());
  }, [dispatch]);

  const [roles, setRoles] = React.useState([]);
  const { roles: rolesRecuperados } = useSelector((state) => state.rol);
  const { acciones } = useSelector((state) => state.permiso);
  const [colores, setColores] = React.useState({
    Propio: acciones[0].bgColor || "#FFF",
    Departamento: acciones[3].bgColor || "#FFF",
    Facultad: acciones[6].bgColor || "#FFF",
  });

  React.useEffect(() => {
    if (rolesRecuperados.length > 0) {
      const rolesMapeados = rolesRecuperados.map((rol) => {
        let colorNivel = "#FFF";
        const permisos = rol.permisos;
        if (
          permisos.some(
            (permiso) =>
              permiso.nombre === "Facultad" && permiso.acciones.length > 0
          )
        ) {
          colorNivel = colores.Facultad;
        } else if (
          permisos.some(
            (permiso) =>
              permiso.nombre === "Departamento" && permiso.acciones.length > 0
          )
        ) {
          colorNivel = colores.Departamento;
        } else if (
          permisos.some(
            (permiso) =>
              permiso.nombre === "Propio" && permiso.acciones.length > 0
          )
        ) {
          colorNivel = colores.Propio;
        }
        return {
          id: rol.id,
          nombre: rol.rol,
          colorNivel,
        };
      });
      setRoles(rolesMapeados);
    }
  }, [rolesRecuperados]);

  const handleRolesSelect = (event, values) => {
    const selectedIds = values.map((value) => value.id);
    dispatch(setRolesAsignar(selectedIds));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h7" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
        Selecciona uno o más roles
      </Typography>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={roles}
          getOptionLabel={(option) => option.nombre}
          onChange={handleRolesSelect}
          filterSelectedOptions
          noOptionsText="No hay más roles."
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  label={option.nombre}
                  {...tagProps}
                  style={{ backgroundColor: option.colorNivel, color: "white" }}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Rol/Roles"
              // placeholder="Agrega otro."
              sx={{
                input: { color: "black" }, // Cambia el color del texto aquí
                label: { color: "#676767" }, // Cambia el color del label aquí
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
