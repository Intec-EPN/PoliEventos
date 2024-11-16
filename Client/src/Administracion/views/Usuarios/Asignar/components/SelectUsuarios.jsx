import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { setUsuarioAsignar } from "../../../../../store/Administracion/Usuarios/usuariosSlice";

export default function SelectUsuarios() {
  const dispatch = useDispatch();
  const { usuarios: usuariosRecuperados } = useSelector(
    (state) => state.usuarios
  );

  const [usuarios, setUsuarios] = React.useState([]);

  React.useEffect(() => {
    const usuariosMapeados = usuariosRecuperados.map((usuario) => ({
      nombre: `${usuario.nombre}, ${usuario.correo}`,
      id: usuario.id,
    }));
    setUsuarios(usuariosMapeados);
  }, [usuariosRecuperados]);

  const handleUsuarioSelect = (event, value) => {
    dispatch(setUsuarioAsignar(value.id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h7" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
        Selecciona un usuario
      </Typography>
      <Autocomplete
        disablePortal
        options={usuarios}
        getOptionLabel={(option) => option.nombre}
        onChange={handleUsuarioSelect}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Usuario" />
        )}
      />
    </Box>
  );
}
