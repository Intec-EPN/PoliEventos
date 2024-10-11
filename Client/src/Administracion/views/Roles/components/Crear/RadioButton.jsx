import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { handleSeleccion } from "../../../../../store/Administracion/Roles/rolSlice";

export const RadioButton = () => {
  const dispatch = useDispatch();

  const onRadioChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(handleSeleccion(selectedValue))
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
          value="Facutlad"
          control={<Radio />}
          label="Facultad"
        />
      </RadioGroup>
    </FormControl>
  );
};
