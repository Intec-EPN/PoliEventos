import { DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const Descripcion = () => {
  const { register } = useFormContext();
  return (
    <>
      <DialogContentText>¿De qué trata el evento?</DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="descripcion"
        name="descripcion"
        label="Descripción"
        type="text"
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        {...register("descripcion")}
      />
    </>
  );
};
