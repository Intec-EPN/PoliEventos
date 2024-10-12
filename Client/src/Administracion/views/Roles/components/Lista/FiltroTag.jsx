import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  OutlinedInput,
  ListSubheader,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setFiltro } from "../../../../../store/Administracion/Roles/rolSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 360,
    },
  },
};

export const FiltroTag = ({ permisosAcciones = [], acciones = [] }) => {
  const [selectedActions, setSelectedActions] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedActions(typeof value === "string" ? value.split(",") : value);
  };

  const handleToggle = (accionId) => {
    setSelectedActions((prevSelected) => {
      const isSelected = prevSelected.includes(accionId);
      const newSelected = isSelected
        ? prevSelected.filter((id) => id !== accionId)
        : [...prevSelected, accionId];

      // Despacha el id cada vez que se selecciona o deselecciona
      console.log(accionId);
      dispatch(setFiltro(accionId)); // Enviar el id
      return newSelected;
    });
  };

  // Chequeo para asegurarse de que las arrays no sean undefined
  if (!Array.isArray(permisosAcciones) || !Array.isArray(acciones)) {
    return null;
  }

  return (
    <FormControl sx={{ m: 1, width: 360 }}>
      <InputLabel id="multiple-checkbox-label">Permiso</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={selectedActions}
        onChange={handleChange}
        input={<OutlinedInput label="Permiso" />}
        renderValue={(selected) =>
          selected
            .map((id) => {
              const action = acciones.find((a) => a.id === id);
              return action ? action.accion : "";
            })
            .join(", ")
        }
        MenuProps={MenuProps}
      >
        {permisosAcciones.flatMap((permiso, index) => [
          <ListSubheader key={`subheader-${index}`}>
            {permiso.nombre}
          </ListSubheader>,
          ...permiso.acciones.map((accionId) => {
            const accion = acciones.find((a) => a.id === accionId);
            // Verificamos que la acción esté definida antes de acceder a su id
            if (!accion) return null;
            return (
              <MenuItem
                key={accion.id}
                value={accion.id}
                onClick={() => handleToggle(accion.id)}
              >
                <Checkbox checked={selectedActions.includes(accion.id)} />
                <ListItemText primary={accion.accion} />
              </MenuItem>
            );
          }),
        ])}
      </Select>
    </FormControl>
  );
};
