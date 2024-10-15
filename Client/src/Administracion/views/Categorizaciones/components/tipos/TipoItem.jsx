import { Controller } from "react-hook-form";
import {
  ListItem,
  TextField,
  IconButton,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export const TipoItem = ({
  index,
  tipo,
  editTipo,
  control,
  errors,
  validateTipo,
  onViewClick,
}) => {
  return (
    <ListItem sx={{ border: "blue" }} mb={2}>
      <FormControl fullWidth error={!!errors.tipos?.[index]}>
        <Controller
          name={`tipos[${index}]`}
          control={control}
          defaultValue={tipo || ""}
          rules={{ validate: validateTipo }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              disabled={!editTipo}
              sx={{ mr: 3 }}
            />
          )}
        />
        {/* Muestra un mensaje de error si existe */}
        {errors.tipos?.[index] && (
          <FormHelperText>{errors.tipos[index].message}</FormHelperText>
        )}
      </FormControl>
      {/* TODO CAMBIAR el método. */}
      {/* <IconButton
        onClick={() => onViewClick(categoria, tipo)}
        disabled={!editTipo}
      >
        <DeleteIcon sx={{ color: "#2c4175" }} />
      </IconButton> */}
      <IconButton
        onClick={() => onViewClick(categoria, tipo)}
        disabled={!editTipo}
      >
        <VisibilityIcon sx={{ color: "#2c4175" }} />
      </IconButton>
    </ListItem>
  );
};
