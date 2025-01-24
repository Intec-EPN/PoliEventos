import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { startLoadingDepartamentos } from "../../../../store/GestionEventos/thunk";

export const Departamento = () => {
  const dispatch = useDispatch();
  const { setValue } = useFormContext();

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
    // Seleccionar los tres departamentos por defecto
    setValue("departamento", [1, 2, 3]);
  }, [dispatch, setValue]);

  const { departamentos } = useSelector((state) => state.gestionEvento);

  useEffect(() => {
    if (departamentos.length > 0) {
      const allDepartamentos = departamentos.map((dep) => dep.id);
      setValue("departamento", allDepartamentos);
    }
  }, [departamentos, setValue]);

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>      
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
    </Box>
  );
};
