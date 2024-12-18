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

export const Departamento = () => {
  const dispatch = useDispatch();
  const { register, setValue, watch } = useFormContext();
  const tipoSeleccion = watch("tipoSeleccion");

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

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
      setValue("departamento", allDepartamentos);
    } else if (tipoSeleccion === "departamento") {
      setValue("departamento", []);
    }
  }, [tipoSeleccion, departamentos, setValue]);

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>
      {tipoSeleccion === "departamento" && (
        <>
          <DialogContentText sx={{ color: "#333333" }}>
            Departamento
          </DialogContentText>
          <FormControl sx={{ width: "100%" }}>
            <Select
              labelId="departamento-label"
              placeholder="Departamento/s*"
              displayEmpty
              id="departamento-select"
              multiple
              value={departamento}
              onChange={handleChange}
              input={<OutlinedInput placeholder="Departamento" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Departamento/s*</em>;
                }
                return selected
                  .map((value) => {
                    const dep = departamentos.find((dep) => dep.id === value);
                    return dep ? dep.departamento : value;
                  })
                  .join(", ");
              }}
              {...register("departamento")}
            >
              {departamentos.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  <span
                    style={{
                      border: "0.5px solid rgba(0, 0, 0, 0.15)",
                      backgroundColor:
                        dep.id === 1
                          ? "#4b99d2"
                          : dep.id === 2
                          ? "#a479b1"
                          : dep.id === 3
                          ? "#fbbc04"
                          : "transparent",
                      display: "inline-flex",
                      width: "4px",
                      height: "13px",
                      marginRight: "10px",
                    }}
                  ></span>
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
