import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // TODO REGISTRO
    console.log("Registro usando correo institucional");
    navigate("/admin/permisos");
  };

  const handleLogin = () => {
    // TODO LOGIN
    console.log("Iniciar sesión usando correo institucional");
    navigate("/admin/permisos");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #03266e 0%, #151e37 100%)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
          padding: "40px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          PoliEventos
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Button variant="outlined" color="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
