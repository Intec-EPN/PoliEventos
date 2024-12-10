import React, { useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";

export const DepartamentoItemInicial = ({ departamentos, onReset }) => {
  const [editMode, setEditMode] = useState(false);
  const { departamentos: deptsCargados } = useSelector(
    (state) => state.gestionEvento
  );

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
      <Box display="flex" alignItems="center">
        <Typography sx={{ color: "#333333" }}>Departamentos</Typography>
        <IconButton onClick={handleReset} sx={{ m: 0, p: 0.4 }}>
          <RestartAltIcon sx={{ color: "#0a3b91", width: "1.3rem" }} />
        </IconButton>
      </Box>
      <Box display="flex" gap={1} >
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
                px:2,
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
    </Box>
  );
};
