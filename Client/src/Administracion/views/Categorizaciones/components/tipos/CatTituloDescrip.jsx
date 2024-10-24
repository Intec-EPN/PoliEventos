import { useEffect } from "react"; 
import { useDispatch } from "react-redux"; 
import { Controller } from "react-hook-form"; 
import { Grid2, TextField, Typography } from "@mui/material"; 
import {
  actualizarDescripcionEsquemaCategoriaActual,
  actualizarNombreEsquemaCategoriaActual,
} from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";

export const CatTituloDescrip = ({ editTipo, control, errors }) => {
  const dispatch = useDispatch();
  return (
    <Grid2
      container
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ mt: 1.5, mb: 1.5 }}
    >
      <Typography variant="h6" color="#2c4175" mb={1}>
        Información general
      </Typography>
      <Controller
        name="nombre"
        control={control}
        rules={{ 
          required: "Este campo es obligatorio.",
          maxLength: {
            value: 50,
            message: "El nombre no puede tener más de 50 caracteres",
          },
         }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            error={!!errors.nombre}
            helperText={errors.nombre ? errors.nombre.message : "Máximo 50 caracteres"}
            disabled={!editTipo}
            variant="outlined"
            label="Nombre"
            color="primary"
            sx={{ mb: 1, width: "30%" }} 
            onChange={(e) => {
              field.onChange(e); 
              dispatch(actualizarNombreEsquemaCategoriaActual(e.target.value));
            }}
          />
        )}
      />
      <Controller
        name="descripcion"
        control={control}
        rules={{ 
          required: "Este campo es obligatorio.",
          maxLength: {
            value: 150,
            message: "La descripción no puede tener más de 150 caracteres",
          },
         }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            error={!!errors.descripcion}
            helperText={errors.descripcion ? errors.descripcion.message : "Máximo 150 caracteres"}
            disabled={!editTipo}
            variant="outlined"
            label="Descripción"
            color="primary"
            sx={{ mb: 2, width: "95%" }} 
            onChange={(e) => {
              field.onChange(e); 
              dispatch(actualizarDescripcionEsquemaCategoriaActual(e.target.value)); 
            }}
          />
        )}
      />
    </Grid2>
  );
};
