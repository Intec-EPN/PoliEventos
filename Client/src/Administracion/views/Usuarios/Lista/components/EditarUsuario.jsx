import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  startLoadingUsuarios,
  startUpdatingUsuario,
} from "../../../../../store/Administracion/Usuarios/thunks";
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

  useEffect(() => {
    dispatch(startLoadingUsuarios());
  }, [dispatch]);

  const usuario = useSelector((state) =>
    state.usuarios.usuarios.find((user) => user.id === usuarioId)
  );
  if (!usuario) {
    return <div>Usuario no encontrado</div>;
  }

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      contraseñá: "",
    },
  });

  useEffect(() => {
    if (usuario) {
      setValue("nombre", usuario.nombre);
      setValue("correo", usuario.correo);
      setOriginalValues({
        nombre: usuario.nombre,
        correo: usuario.correo,
      });
    }
  }, [usuario, setValue]);

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
        <TextField
          label="Contraseña"
          type="password"
          {...register("password")}
        />
        {error && (
          <Typography variant="body2" color="error" align="center">
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