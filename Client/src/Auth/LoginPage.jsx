import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Ingresar } from "./components/Ingresar";
import { Registrar } from "./components/Registrar";
import BotonSeleccionar from "./components/BotonSeleccionar";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState("ingresar");

  const handleSeleccionChange = (newSeleccion) => {
    setSeleccion(newSeleccion);
  };

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
        <BotonSeleccionar onSeleccionChange={handleSeleccionChange} />
        {/* SEPARACIÓN DE LOS BOTONES */}
        {seleccion === "ingresar" ? <Ingresar /> : <Registrar />}
      </Box>
    </>
  );
};
