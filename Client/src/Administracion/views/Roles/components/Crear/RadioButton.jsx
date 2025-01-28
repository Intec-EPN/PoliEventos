import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  handleSeleccion,
  reiniciarRol,
  resetDepartamentos,
} from "../../../../../store/Administracion/Roles/rolSlice";
import { startLoadingDepartamentosFacultades } from "../../../../../store/Administracion/Roles/thunks";
import { SeleccionarDept } from "./SeleccionarDept";
import { useEffect, useState } from "react";

export const RadioButton = ({ reset }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleSeleccion("Departamento");
  }, []);

  const [departamentoSeleccionado, setDepartamentoSeleccionado] =
    useState(true);
  const onRadioChange = (e) => {
    // Reinicio de los campos del formulario cuando cambia el radioButton
    reset({
      nombreRol: "",
      descripcionRol: "",
    });
    setDepartamentoSeleccionado(!departamentoSeleccionado);

    dispatch(reiniciarRol());

    const selectedValue = e.target.value;
    dispatch(handleSeleccion(selectedValue));
    if (selectedValue === "Facultad") {
      dispatch(startLoadingDepartamentosFacultades());
    } else {
      dispatch(resetDepartamentos());
    }
  };

  return (
    <FormControl>
      <Typography sx={{ fontWeight: 700, color: "primary" }}>
        Permisos en:
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="Departamento"
        onChange={onRadioChange}
      >
        <FormControlLabel
          value="Departamento"
          control={<Radio />}
          label="Departamento"
        />
        <FormControlLabel
          value="Facultad"
          control={<Radio />}
          label="Facultad"
        />
      </RadioGroup>
      {departamentoSeleccionado ? <SeleccionarDept /> : null}
      <Typography mt={2} mb={-1} sx={{ fontWeight: 700, color: "primary" }}>
        Completa:
      </Typography>
    </FormControl>
  );
};
