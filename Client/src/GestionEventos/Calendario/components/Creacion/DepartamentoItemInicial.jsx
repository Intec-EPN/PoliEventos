import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

export const DepartamentoItemInicial = ({ departamentos, onReset }) => {
  const [editMode, setEditMode] = useState(false);
  const { departamentos: deptsCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const { nivelFacultad } = useSelector((state) => state.adminAuth);

  const handleReset = () => {
    setEditMode(!editMode);
    onReset(!editMode);
  };

  const getDepartamentoNombre = (id) => {
    const dept = deptsCargados.find((d) => d.id === id);
    return dept ? dept.departamento : "Desconocido";
  };

  if (editMode) {
    return null; // No renderizar nada cuando está en modo de edición
  }

  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ color: "#333333" }}>Departamentos</Typography>
      <Box display="flex" gap={1}>
        {departamentos.map((departamento, index) => (
          <Box
            key={index}
            display={"flex"}
            sx={{ width: "auto" }}
            gap={1}
            mb={1}
          >
            <Paper
              sx={{
                width: "100%",
                mt: 0.5,
                p: 1,
                px: 2,
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #dfdfdf",
                boxShadow: "none",
              }}
            >
              <Typography>{getDepartamentoNombre(departamento)}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      {nivelFacultad && (
        <Button onClick={handleReset} variant="outlined" sx={{ mt: 1, color:"#2c4175", border:"1px solid rgba(44, 65, 117, 0.5)" }}>
          Reiniciar organizadores
        </Button>
      )}
    </Box>
  );
};
