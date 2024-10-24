import { Controller } from "react-hook-form";
import { ListItem, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export const NuevaCategoria = ({
  index,
  categoria,
  editTipo,
  control,
  errors,
  validateTipo,
  onEliminarTipo,
  errorMsg,
}) => {
  return (
    <ListItem sx={{ border: "blue" }} mb={2}>
      <Controller
        name={`nuevasCategorias[${index}]`}
        control={control}
        defaultValue={categoria || ""}
        rules={{ validate: validateTipo }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            hiddenLabel
            disabled={!editTipo}
            label="Ingrese una nueva categoría"
            sx={{ mr: 3 }}
            error={!!errors?.nuevosTipos?.[index]}
            helperText={errors?.nuevosTipos?.[index]?.message || errorMsg}
          />
        )}
      />

      <IconButton onClick={() => onEliminarTipo(index)} disabled={!editTipo}>
        {/* Botón para eliminar */}
        <DeleteIcon sx={{ color: `${editTipo ? "red" : "#90a4ae"}` }} />
      </IconButton>
    </ListItem>
  );
};
