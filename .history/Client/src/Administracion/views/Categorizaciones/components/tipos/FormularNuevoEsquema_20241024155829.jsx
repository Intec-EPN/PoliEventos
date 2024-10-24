import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const FormularNuevoEsquema = ({
  nuevoEsquema,
  setNuevoEsquema,
  onGuardar,
  onCancel
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      nombre:'',
      descripcion:''
    },
  });

  const onSubmit = (data) => {
    onGuardar(data, setError);
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
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#2c4175" }}
        >
          Guardar
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#e3320e" }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};
