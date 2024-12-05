import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import {
  Box,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { startLoadingDepartamentos } from "../../../../store/GestionEventos/thunk";

export const Departamento = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { register, setValue, watch } = useFormContext();
  const tipoSeleccion = watch("tipoSeleccion");

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  useEffect(() => {
    if (defaultValues) {
      setValue("departamento", defaultValues);
    }
  }, [defaultValues, setValue]);

  const { departamentos } = useSelector((state) => state.gestionEvento);
  const departamento = watch("departamento") || [];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      "departamento",
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (tipoSeleccion === "facultad") {
      const allDepartamentos = departamentos.map((dep) => dep.id);
      console.log('debug');
      setValue("departamento", allDepartamentos);
    } else if (tipoSeleccion === "departamento") {
      setValue("departamento", []);
    }
  }, [tipoSeleccion, departamentos, setValue]);

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>
      {tipoSeleccion === "departamento" && (
        <>
          <DialogContentText>Departamento</DialogContentText>
          <FormControl sx={{ width: "100%" }}>
            <Select
              labelId="departamento-label"
              id="departamento-select"
              multiple
              value={departamento}
              onChange={handleChange}
              input={<OutlinedInput placeholder="Departamento" />}
              {...register("departamento")}
            >
              {departamentos.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.departamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </Box>
  );
};
