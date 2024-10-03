import { Controller } from "react-hook-form";
import { ListItem, TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const TipoItem = ({ index, tipo, editTipo, control, errors, validateTipo, onViewClick }) => {
  return (
    <ListItem sx={{ border: "blue" }} mb={2}>
      <Controller
        name={`tipos[${index}]`}
        control={control}
        defaultValue={tipo || ""}
        rules={{ validate: validateTipo }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            hiddenLabel
            disabled={!editTipo}
            label={tipo}
            sx={{ mr: 3 }}
            error={!!errors.tipos?.[index]}
          />
        )}
      />
      <IconButton onClick={() => onViewClick(categoria, tipo)} disabled={!editTipo}>
        <VisibilityIcon sx={{ color: "#2c4175" }} />
      </IconButton>
    </ListItem>
  );
};

