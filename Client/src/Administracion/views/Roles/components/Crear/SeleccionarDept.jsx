import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDepartamento } from "../../../../../store/Administracion/Roles/rolSlice";

// TODO Cambiar por los permisos que vienen de slice
import { dept } from "../../../permisos";

const names = dept;

export const SeleccionarDept = () => {
  const { creandoRol } = useSelector((state) => state.rol);
  
  const dispatch = useDispatch();

  const [dept, setDept] = useState("");

  const handleChange = (event) => {
    setDept(event.target.value);
    dispatch(setDepartamento(event.target.value))
  };


  // Para reiniciar el select al enviar un formulario
  const resetSelect = () => {
    setDept(""); // Resetea el valor del select
  };
  useEffect(() => {
    if(!creandoRol){
      resetSelect();
    }
  }, [creandoRol]);

  return (
    <Grid2 container mb={2}>
      <FormControl>
        <InputLabel>Departamento</InputLabel>
        <Select
          placeholder="Departamento"
          value={dept}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Departamento" />
          }
          sx={{ width: 150 }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
  );
};
