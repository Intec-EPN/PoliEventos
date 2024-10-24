import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { nuevasCategoriasEsquemaCategoriaActual } from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { startCreatingEsquema, startEditingEsquema } from "../../../../../store/Administracion/Categorizacion/thunks";
import { AlertCorrecto } from "./AlertCorrecto";

export const AgregarCategorias = ({
  validarCategoria,
  idEsquemaActual,
  onCancelAgregar,
  crear = false
}) => {
  const { control, handleSubmit, getValues, setError, clearErrors } = useForm({
    defaultValues: {
      fields: [{ value: "" }], // Valor inicial con un campo vacío
    },
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields", // Nombre del array en los valores del formulario
  });

  // Para gestionar enviando
  const [enviado, setEnviado] = useState(false);
  // Para alerta del success:
  const [alertOpen, setAlertOpen] = useState(false);

  const onSubmit = (data) => {
    // Obtengo la data
    const campos = data.fields;
    // Verificar si hay campos vacíos
    const emptyFields = campos.filter((field) => !field.value);

    if (emptyFields.length > 0) {
      emptyFields.forEach((_, index) => {
        setError(`fields.${index}.value`, {
          type: "manual",
          message: "Este campo es obligatorio", // Mensaje de error para campos vacíos
        });
      });
      return; // No enviar datos si hay campos vacíos
    }

    const categoriasNuevas = campos.map((campo) => ({
      nombre: campo.value,
      visible: true,
      esquemas_id: idEsquemaActual,
    }));
    setAlertOpen(true);
    setEnviado(true);
    dispatch(nuevasCategoriasEsquemaCategoriaActual(categoriasNuevas));
    
    if(crear){
        dispatch(startCreatingEsquema());
    }else{
        dispatch(startEditingEsquema(idEsquemaActual));
    }
  };



  // Validación de existencia de campos y errores.
  const handleAddField = () => {
    const lastFieldValue = getValues(`fields.${fields.length - 1}.value`);

    // Validar el último campo antes de agregar uno nuevo
    const validationResult = validarCategoria(lastFieldValue);
    if (validationResult !== true) {
      // Si hay un error, configurar el error en el formulario
      setError(`fields.${fields.length - 1}.value`, {
        type: "manual",
        message: validationResult,
      });
      return; // No agregar un nuevo campo si la validación falla
    }

    // Limpiar el error si la validación es exitosa
    clearErrors(`fields.${fields.length - 1}.value`);
    append({ value: "" }); // Agregar un nuevo campo
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {alertOpen ? <AlertCorrecto openT={alertOpen} /> : null}
      <List>
        {fields.map((field, index) => (
          <ListItem key={field.id}>
            <Controller
              control={control}
              name={`fields.${index}.value`} // Registrar el campo dinámico
              defaultValue={field.value} // Asignar valor inicial
              render={({ field: { onChange, onBlur, value, ref } }) => {
                const errorMessage =
                  getValues(`fields.${index}.error`)?.message ||
                  (index === fields.length - 1 && !value
                    ? "Este campo es obligatorio"
                    : "");
                const hasError = Boolean(errorMessage); // Verifica si hay un error

                return (
                  <TextField
                    sx={{ width: true }}
                    inputRef={ref}
                    disabled={enviado}
                    label={"Ingrese una nueva categoría"}
                    variant="outlined"
                    onChange={(e) => {
                      onChange(e); // Actualiza el valor en react-hook-form
                      if (e.target.value) {
                        clearErrors(`fields.${index}.value`); // Limpiar el error al escribir
                      }
                    }}
                    onBlur={onBlur} // Maneja el evento blur
                    value={value} // Asigna el valor actual
                    error={hasError} // Muestra error si existe
                    helperText={hasError ? errorMessage : ""} // Mensaje de error
                  />
                );
              }}
            />
            <IconButton onClick={() => remove(index)} disabled={enviado}>
              <DeleteIcon
                sx={{ color: `${!enviado ? "red" : "#90a4ae"}` }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box
        display={"flex"}
        sx={{
          width: { xs: "100%", md: "98%" },
          justifyContent: { xs: "center", md: "end" },
        }}
      >
        <Button variant="contained" onClick={handleAddField} disabled={enviado}>
          Agregar categoría
        </Button>
      </Box>
      <Box display="flex">
        <Button
          type="submit"
          disabled={enviado}
          variant="contained"
          sx={{
            backgroundColor: "#2c4175",
            mr: 2,
            width: { xs: "100%", md: "10%" },
          }}
        >
          Crear
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#e3320e", width: { xs: "100%", md: "10%" } }}
          onClick={onCancelAgregar}
        >
          {
            enviado ? 'Cerrar' : 'Cancelar' 
          }
        </Button>
      </Box>
    </form>
  );
};
