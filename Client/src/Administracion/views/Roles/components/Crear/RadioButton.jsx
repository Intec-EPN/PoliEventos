import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { handleSeleccion } from "../../../../../store/Administracion/Roles/rolSlice";
import { startLoadingDepartamentosFacultades } from "../../../../../store/Administracion/Roles/thunks";

export const RadioButton = ({ reset }) => {
  const dispatch = useDispatch();

  const onRadioChange = (e) => {
    // Reinicio de los campos del formulario cuando cambia el radioButton
    reset({
      nombreRol: "",
      descripcionRol: "",
    });

    // Analisis de dispatch y demás.
    const selectedValue = e.target.value;
    dispatch(handleSeleccion(selectedValue));
    if (selectedValue === "Facultad") {
      dispatch(startLoadingDepartamentosFacultades());
    }
  };

  return (
    <FormControl>
      <Box component="div" sx={{ fontWeight: 700, color: "primary" }}>
        Permisos en:
      </Box>
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
    </FormControl>
  );
};
