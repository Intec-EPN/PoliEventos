import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const FormularNuevoEsquema = ({
  nuevoEsquema,
  setNuevoEsquema,
  onGuardar,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: nuevoEsquema.nombre,
      descripcion: nuevoEsquema.descripcion,
    },
  });

  const onSubmit = () => {
    onGuardar();
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="nombre"
        control={control}
        rules={{ required: "El nombre es obligatorio" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            value={nuevoEsquema.nombre}
            onChange={(e) => {
              setNuevoEsquema({ ...nuevoEsquema, nombre: e.target.value });
              field.onChange(e); // Sincroniza con react-hook-form
            }}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
        )}
      />
      <Controller
        name="descripcion"
        control={control}
        rules={{ required: "La descripción es obligatoria" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descripción"
            value={nuevoEsquema.descripcion}
            onChange={(e) => {
              setNuevoEsquema({ ...nuevoEsquema, descripcion: e.target.value });
              field.onChange(e); // Sincroniza con react-hook-form
            }}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" sx={{ backgroundColor: "#2c4175" }}>
        Guardar
      </Button>
    </Box>
  );
};
