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
      <DialogContentText sx={{ color:"#333333" }}>Ingresa un nombre corto</DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="titulo"
        name="titulo"
        placeholder="Título* (máximo 40 caracteres)"
        type="text"
        fullWidth
        variant="outlined"
        slotProps={{ htmlInput: { maxLength: 40 } }}
        {...register("titulo")}
      />
    </Box>
  );
};
