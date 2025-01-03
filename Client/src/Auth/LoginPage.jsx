import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Ingresar } from "./components/Ingresar";
import { Registrar } from "./components/Registrar";
import BotonSeleccionar from "./components/BotonSeleccionar";

export const LoginPage = () => {
  const [seleccion, setSeleccion] = useState("ingresar");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSeleccionChange = (newSeleccion) => {
    setSeleccion(newSeleccion);
  };

  useEffect(() => {
    console.log("useEffect - registroExitoso:", registroExitoso); // Agrega este log
    if (registroExitoso) {
      setTimeout(() => {
        setSeleccion("ingresar");
        handleSeleccionChange("ingresar");
        setRegistroExitoso(false);
      }, 2000);
    }
  }, [registroExitoso]);

  useEffect(() => {
    console.log("useEffect - seleccion:", seleccion); // Agrega este log
  }, [seleccion]);

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
      </Box>
    </>
  );
};
