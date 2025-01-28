import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  startLoadingUsuarios,
  startUpdatingUsuario,
} from "../../../../../store/Administracion/Usuarios/thunks";
import { opcionActual } from "../../../../../store/Administracion/administracionSlice";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import PopUpEditarUsuario from "./PopUpEditarUsuario";

export const EditarUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usuarioId } = useParams();
  const [originalValues, setOriginalValues] = useState({});
  const [edicionCompleta, setEdicionCompleta] = useState(false);
  const handleClose = () => setEdicionCompleta(false);
  const [error, setError] = useState(null);

  const usuarios = useSelector((state) => state.usuarios.usuarios);

  useEffect(() => {
    dispatch(opcionActual("Editar usuario"));
  }, [dispatch]);

  const usuario = usuarios.find((user) => user.id === usuarioId);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      contraseña: "",
    },
  });

  useEffect(() => {
    if (usuario && !originalValues.nombre && !originalValues.correo) {
      setValue("nombre", usuario.nombre);
      setValue("correo", usuario.correo);
      setOriginalValues({
        nombre: usuario.nombre,
        correo: usuario.correo,
      });
    }
  }, [usuario, setValue, originalValues]);

  const onSubmit = async (data) => {
    const updatedData = {};
    for (const key in data) {
      if (data[key] !== originalValues[key] && data[key] !== "") {
        updatedData[key] = data[key];
      }
    }
    try {
      await dispatch(startUpdatingUsuario(usuarioId, updatedData));
      setError(null);
      setEdicionCompleta(true);
      setTimeout(() => {
        navigate("/admin/usuarios/lista");
      }, 2000);
    } catch (err) {
      setError(err.message); // Establecer el mensaje de error
    }
  };

  const onCancel = () => {
    navigate("/admin/usuarios/lista");
  };

  return (
    <Box ml={2}>
      <Typography variant="h6" color="#2c4175" my={2} mb={3}>
        Editar usuario:
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        width="35%"
        gap={3}
      >
        <TextField label="Nombre" {...register("nombre", { required: true })} />
        <TextField label="Correo" {...register("correo", { required: true })} />
        <Typography variant="body1" color="red">Si desea resetear la contraseña digitela <strong>aquí</strong>.</Typography>
        <TextField
          label="Contraseña nueva (opcional)"
          type="password"
          {...register("password")}
        />
        {error && (
          <Typography variant="body2" color="error" align="center" mb={2}>
            {error}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button fullWidth type="submit" variant="contained">
            Guardar
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#e3320e" }}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
      <PopUpEditarUsuario open={edicionCompleta} handleClose={handleClose} />
    </Box>
  );
};