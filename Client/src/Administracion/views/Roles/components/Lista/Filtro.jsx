import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { setFiltro } from "../../../../../store/Administracion/Roles/rolSlice";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Filtro = ({ opciones = [], filtro = "", size }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  const handleToggle = (opcion) => {
    setSelectedOptions((prevSelected) => {
      const isSelected = prevSelected.includes(opcion);

      // manejar el select
      const newSelected = isSelected
        ? prevSelected.filter((item) => item !== opcion)
        : [...prevSelected, opcion];
      
      dispatch(setFiltro(opcion)); // Enviar la opción seleccionada/deseleccionada

      return newSelected; 
    });
  };

  return (
    <FormControl sx={{ m: 1, width: size }}>
      <InputLabel id="filtro-label">{filtro}</InputLabel>
      <Select
        labelId="filtro-label"
        id="filtro-select"
        multiple
        value={selectedOptions}
        onChange={(event) => setSelectedOptions(event.target.value)} // Solo actualiza el estado aquí
        input={<OutlinedInput label={filtro} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {opciones.map((opcion) => (
          <MenuItem key={opcion} value={opcion} onClick={() => handleToggle(opcion)}>
            <Checkbox checked={selectedOptions.includes(opcion)} />
            <ListItemText primary={opcion} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
