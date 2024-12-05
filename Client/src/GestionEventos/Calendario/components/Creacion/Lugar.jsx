import { Box, DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const Lugar = ({ defaultValue }) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue("lugar", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
      <DialogContentText>¿Dónde será el evento?</DialogContentText>
      <TextField
        required
        margin="dense"
        id="lugar"
        name="lugar"
        placeholder="Lugar*"
        // label="Lugar"
        type="text"
        fullWidth
        variant="outlined"
        {...register("lugar")}
      />
    </Box>
  );
};
