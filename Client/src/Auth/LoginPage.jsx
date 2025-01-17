import { Button, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Ingresar } from "./components/Ingresar";
import { Registrar } from "./components/Registrar";
import BotonSeleccionar from "./components/BotonSeleccionar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState("ingresar");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSeleccionChange = (newSeleccion) => {
    setSeleccion(newSeleccion);
  };

  useEffect(() => {
    if (registroExitoso) {
      setTimeout(() => {
        setSeleccion("ingresar");
        handleSeleccionChange("ingresar");
        setRegistroExitoso(false);
      }, 2000);
    }
  }, [registroExitoso]);

  return (
    <>
      <Box
        sx={{
          background: "radial-gradient(circle, #03266e 0%, #151e37 100%)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BotonSeleccionar
          alignment={seleccion}
          onSeleccionChange={handleSeleccionChange}
        />
        {/* SEPARACIÓN DE LOS BOTONES */}
        {seleccion === "ingresar" ? (
          <Ingresar />
        ) : (
          <Registrar onRegistroExitoso={() => setRegistroExitoso(true)} />
        )}
        <Box
          sx={{
            mt: 2,
          }}
        >
          <IconButton
            variant="contained"
            sx={{
              color: "white",
            }}
            onClick={() => navigate("/")}
          >
            <CalendarMonthIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
