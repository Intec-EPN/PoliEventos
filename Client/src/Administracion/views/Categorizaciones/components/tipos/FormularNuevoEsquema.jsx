import { Box, Button, TextField } from "@mui/material";

export const FormularNuevoEsquema = ({
  nuevoEsquema,
  setNuevoEsquema,
  onGuardar,
}) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        label="Nombre"
        value={nuevoEsquema.nombre}
        onChange={(e) => {
          setNuevoEsquema({ ...nuevoEsquema, nombre: e.target.value });
        }}
        required
      />
      <TextField
        label="Descripcion"
        value={nuevoEsquema.descripcion}
        onChange={(e) => {
          setNuevoEsquema({ ...nuevoEsquema, descripcion: e.target.value });
        }}
        required
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#2c4175" }}
        onClick={onGuardar}
      >
        Guardar
      </Button>
    </Box>
  );
};
