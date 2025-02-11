import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosConfig"; // Importar axiosInstance
import { useState } from "react"; // Importar useState
import PopUpRegistro from "./PopUpRegistro";

export const Registrar = ({ onRegistroExitoso }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const handleClose = () => setExito(false);
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
      onRegistroExitoso();
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            pb: "2.5rem",
            pt: "2rem",
            px: "3rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            width: {xs: "75%", sm: "95%"},
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "600", color: "#0a2257" }}>
            Registrar
          </Typography>
          <Typography variant="p" sx={{ color: "#0a2257" }}>
            Bienvenido, complete los campos para registrarse.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            my="1rem"
            sx={{ width: "100%", maxWidth: "40rem" }}
          >
            <TextField
              label="Nombre y apellido"
              variant="filled"
              {...register("nombre_apellido", {
                required: "El nombre y apellido es obligatorio",
              })}
              error={!!errors.nombre_apellido}
              helperText={errors.nombre_apellido?.message}
            />
            <TextField
              label="Correo"
              variant="filled"
              {...register("correo", { required: "El correo es obligatorio" })}
              error={!!errors.correo}
              helperText={errors.correo?.message}
            />
            <TextField
              label="Contraseña"
              variant="filled"
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
          <Button variant="contained" type="submit">
            Registrarse
          </Button>
        </Box>
      </form>

      <PopUpRegistro open={exito} handleClose={handleClose} />
    </>
  );
};
