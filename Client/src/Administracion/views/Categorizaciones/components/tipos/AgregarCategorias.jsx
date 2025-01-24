import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const AgregarCategorias = ({
  fields,
  remove,
  control,
  errors,
  handleAddField,
  onCancelAgregar,
  editCategoria,
  clearErrors,
  disableFields, 
}) => {
  return (
    <>
      <List>
        {fields.map((field, index) => (
          <ListItem key={field.id}>
            <Controller
              control={control}
              name={`nuevasCategorias.${index}.value`} // Registrar el campo dinámico
              defaultValue={field.value} // Asignar valor inicial
              rules={{
                maxLength: {
                  value: 100,
                  message: "Máximo 100 caracteres", // Mensaje si se excede el límite
                },
                validate: {
                  noLeadingTrailingSpaces: (value) =>
                    value.trim() === value || "No puede comenzar o terminar con un espacio",
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                const errorMessage =
                  errors?.nuevasCategorias?.[index]?.value?.message ||
                  (index === fields.length - 1 && !value
                    ? "Este campo es obligatorio"
                    : "");
                const hasError = Boolean(errorMessage); // Verifica si hay un error

                return (
                  <TextField
                    sx={{ width: true }}
                    inputRef={ref}
                    disabled={disableFields} // Deshabilitar campos cuando se guarda
                    label={"Ingrese una nueva categoría"}
                    variant="outlined"
                    onChange={(e) => {
                      onChange(e); // Actualiza el valor en react-hook-form
                      if (e.target.value) {
                        clearErrors(`nuevasCategorias.${index}.value`); // Limpiar el error al escribir
                      }
                    }}
                    onBlur={onBlur} // Maneja el evento blur
                    value={value} // Asigna el valor actual
                    error={hasError} // Muestra error si existe
                    helperText={hasError ? errorMessage : "Máximo 100 caracteres."} // Mensaje de error
                  />
                );
              }}
            />
            <IconButton onClick={() => remove(index)} disabled={editCategoria}>
              <DeleteIcon
                sx={{ color: `${!editCategoria ? "red" : "#90a4ae"}` }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box
        display={"flex"}
        mb={2}
        sx={{
          width: { xs: "100%", md: "98%" },
          justifyContent: { xs: "center", md: "end" },
        }}
      >
        <Button
          variant="contained"
          onClick={handleAddField}
          disabled={editCategoria}
          sx={{width: { xs: "100%", md: "15%" },}}
        >
          Agregar categoría
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e3320e",
            ml: 2,
            width: { xs: "100%", md: "10%" },
          }}
          onClick={onCancelAgregar}
        >
          Quitar todas
        </Button>
      </Box>
    </>
  );
};
