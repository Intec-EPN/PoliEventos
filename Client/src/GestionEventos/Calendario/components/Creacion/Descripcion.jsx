import { DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const Descripcion = ({ defaultValue }) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    console.log("defaultValue:", defaultValue);
    if (defaultValue) {
      setValue("descripcion", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <>
      <DialogContentText>¿De qué trata el evento?</DialogContentText>
      <TextField
        autoFocus
        required
        defaultValue={defaultValue}
        margin="dense"
        id="descripcion"
        name="descripcion"
        placeholder="Descripción"
        // label="Descripción"
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