import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../store/auth/thunks";

export const Ingresar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.nombre === "admn") {
        navigate("/admin/permisos");
      } else if (user.roles && user.roles.length > 0) {
        navigate("/calendario");
      }
      setExito(true);
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setExito(false);
    setError(null);
    try {
      await dispatch(startLogin(data));
      setExito(true);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
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
          maxWidth: { xs: "18rem", sm: "100%" },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "600", color: "#0a2257" }}>
          Ingresar
        </Typography>
        <Typography variant="p" sx={{ color: "#0a2257" }}>
          Bienvenido, complete los campos para ingresar.
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          my="1rem"
          sx={{ width: "100%", maxWidth: "40rem" }}
        >
          <TextField
            label="Correo"
            variant="filled"
            {...register("correo", { required: "Correo es requerido" })}
            error={!!errors.correo}
            helperText={errors.correo?.message}
          />
          <TextField
            label="Contraseña"
            variant="filled"
            type="password"
            {...register("contraseña", { required: "Contraseña es requerida" })}
            error={!!errors.contraseña}
            helperText={errors.contraseña?.message}
          />
        </Box>
        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}
        {exito && (
          <Typography variant="body2" color="success" mb={2}>
            Inicio de sesión exitoso
          </Typography>
        )}
        <Button variant="contained" type="submit">
          Ingresar
        </Button>
      </Box>
    </form>
  );
};
