import { Box, DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const Titulo = () => {
  const { register } = useFormContext();
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
      <DialogContentText>¿Cuál es el nombre del evento?</DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="titulo"
        name="titulo"
        label="Título"
        type="text"
        fullWidth
        variant="outlined"
        {...register("titulo")}
      />
    </Box>
  );
};
