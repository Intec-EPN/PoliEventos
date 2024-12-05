import { Box, DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const Titulo = ({ defaultValue }) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue("titulo", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
      <DialogContentText>¿Cuál es el nombre del evento?</DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="titulo"
        name="titulo"
        placeholder="Título*"
        // label="Título"
        type="text"
        fullWidth
        variant="outlined"
        {...register("titulo")}
      />
    </Box>
  );
};
