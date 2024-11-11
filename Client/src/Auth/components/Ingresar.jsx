import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const Ingresar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <Box display="flex" alignItems="center" pr={3}>
          <Checkbox {...register("recordar")} />
          <Typography variant="p">Recordar sesión</Typography>
        </Box>
        <Button variant="contained" type="submit">
          Ingresar
        </Button>
      </Box>
    </form>
  );
};
