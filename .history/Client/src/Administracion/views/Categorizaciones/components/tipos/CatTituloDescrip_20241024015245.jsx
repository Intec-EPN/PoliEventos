import { Grid2, Typography } from "@mui/material";

export const CatTituloDescrip = ({categoriaActual, descripcion}) => {
  return (
    <Grid2
      container
      display="flex"
      flexDirection="column"
      sx={{mt: 1.5, mb: 1.5 }}
    >
      <Typography
        variant="h5"
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        {categoriaActual}
      </Typography>
      <Typography
        variant="p"
        color="primary"
        sx={{ fontWeight: 400 }}
      >
        {descripcion}
      </Typography>
    </Grid2>
  );
};
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
        rules={{ required: "Este campo es obligatorio." }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            error={!!errors.nombre}
            helperText={errors.nombre ? errors.nombre.message : null}
            disabled={!editTipo}
            variant="outlined"
            label="Nombre"
            color="primary"
            sx={{ mb: 1, width: "30%" }} 
            // Despachar la acción en el onChange
            onChange={(e) => {
              field.onChange(e); // Llama a la función onChange de react-hook-form
              dispatch(actualizarNombreEsquemaCategoriaActual(e.target.value)); // Despacha la acción
            }}
          />
        )}
      />
      <Controller
        name="descripcion"
        control={control}
        rules={{ required: "Este campo es obligatorio." }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            error={!!errors.descripcion}
            helperText={errors.descripcion ? errors.descripcion.message : null}
            disabled={!editTipo}
            variant="outlined"
            label="Descripción"
            color="primary"
            sx={{ mb: 2, width: "95%" }} 
            // Despachar la acción en el onChange
            onChange={(e) => {
              field.onChange(e); // Llama a la función onChange de react-hook-form
              dispatch(actualizarDescripcionEsquemaCategoriaActual(e.target.value)); // Despacha la acción
            }}
          />
        )}
      />
    </Grid2>
  );
};
