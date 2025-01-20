import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const FormularNuevoEsquema = ({
  nuevoEsquema,
  setNuevoEsquema,
  onGuardar,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      nombre: nuevoEsquema.nombre,
      descripcion: nuevoEsquema.descripcion,
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
      <Typography
        variant="h6"
        fontWeight="500"
        noWrap
        component="div"
        color="primary"
      >
        Ingresando nuevo esquema de categorización:
      </Typography>
      <Controller
        name="nombre"
        control={control}
        rules={{
          required: "El nombre es obligatorio",
          maxLength: {
            value: 50,
            message: "El nombre no puede tener más de 50 caracteres",
          },
          validate: {
            noLeadingOrTrailingSpaces: (value) =>
              value.trim() === value ||
              "El nombre no puede comenzar o terminar con un espacio",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            value={nuevoEsquema.nombre}
            onChange={(e) => {
              setNuevoEsquema({ ...nuevoEsquema, nombre: e.target.value });
              field.onChange(e);
            }}
            error={!!errors.nombre}
            helperText={errors.nombre?.message || "Máximo 50 caracteres"}
          />
        )}
      />
      <Controller
        name="descripcion"
        control={control}
        rules={{
          required: "La descripción es obligatoria",
          maxLength: {
            value: 150,
            message: "La descripción no puede tener más de 150 caracteres",
          },
        }}
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
            helperText={errors.descripcion?.message || "Máximo 150 caracteres"}
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
