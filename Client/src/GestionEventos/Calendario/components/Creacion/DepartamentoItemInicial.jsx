import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

export const DepartamentoItemInicial = ({ departamentos }) => {
  const { departamentos: deptsCargados } = useSelector(
    (state) => state.gestionEvento
  );

  return (
    <Box sx={{ my: 1 }}>
      {departamentos.length == 1 && (
        <Box display="flex" flexDirection={"column"}>
          <Typography sx={{ color: "#333333" }}>Departamento</Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "500",
              color: "#164dc9",
              fontSize: "1.1rem",
              mt: 0.5,
            }}
          >
            {
              deptsCargados.find((dep) => dep.id === departamentos[0])
                .departamento
            }
          </Typography>
        </Box>
      )}
      {departamentos.length > 1 && (
        <>
          <Typography sx={{ color: "#333333" }}>Facultad</Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "500",
              color: "#164dc9",
              fontSize: "1.1rem",
              mt: 0.5,
            }}
          >
            FIEE
          </Typography>
        </>
      )}
    </Box>
  );
};
