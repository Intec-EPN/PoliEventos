import { Box, Button, TextField, Typography } from "@mui/material";
import { set, useForm } from "react-hook-form";
import axiosInstance from "../../../../api/axiosConfig"; // Importar axiosInstance
import { useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoadingUsuarios } from "../../../../store/Administracion/Usuarios/thunks";
import { PopUpCrearUsuario } from "./PopUpCrearUsuario";

export const CrearUsuarios = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    navigate("/admin/usuarios/lista");
    setExito(false);
  };
  const onSubmit = async (data) => {
    if (data.nombre_apellido.trim().toLowerCase() === "admn") {
      setError("El nombre y apellido no puede ser 'admn'");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/create", {
        nombre: data.nombre_apellido.trim(),
        email: data.correo.trim(),
        password: data.contraseña.trim(),
      });
      setExito(true);
      dispatch(startLoadingUsuarios());
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };
  const onCancel = () => {
    navigate("/admin/usuarios/lista");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            pb: "2.5rem",
            pt: "2rem",
            ml: "1rem",
            display: "flex",
            flexDirection: "column",
            width: {xs:"90%", md:"45%"},
          }}
        >
          <Typography variant="p" sx={{ color: "#0a2257" }}>
            Complete los campos para crear un nuevo usuario.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            my="1rem"
            sx={{ width: "100%" }}
          >
            <TextField
              sx={{ width: "100%" }}
              label="Nombre y apellido"
              {...register("nombre_apellido", {
                required: "El nombre y apellido es obligatorio",
              })}
              error={!!errors.nombre_apellido}
              helperText={errors.nombre_apellido?.message}
            />
            <TextField
              label="Correo"
              {...register("correo", { required: "El correo es obligatorio" })}
              error={!!errors.correo}
              helperText={errors.correo?.message}
            />
            <TextField
              label="Contraseña"
              type="password"
              {...register("contraseña", {
                required: "La contraseña es obligatoria",
              })}
              error={!!errors.contraseña}
              helperText={errors.contraseña?.message}
            />
          </Box>
          {error && (
            <Typography variant="body2" color="error" mb={2}>
              {error}
            </Typography>
          )}
          <Box display="flex" width="100%" gap={2}>
            <Button fullWidth variant="contained" type="submit">
              Guardar Usuario
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#e3320e" }}
              onClick={onCancel}
            >
              Ver usuarios
            </Button>
          </Box>
        </Box>
      </form>

      <PopUpCrearUsuario open={exito} handleClose={handleClose} />
    </>
  );
};
