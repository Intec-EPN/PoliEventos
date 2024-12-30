import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const TipoSeleccion = () => {
  const { register, setValue } = useFormContext();

  const handleChange = (event) => {
    setValue("tipoSeleccion", event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>
      <FormControl component="fieldset">
        <RadioGroup row {...register("tipoSeleccion")} onChange={handleChange}>
          <FormControlLabel value="departamento" control={<Radio />} label="Departamento" />
          <FormControlLabel value="facultad" control={<Radio />} label="Facultad" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};