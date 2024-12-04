import { Box, DialogContentText, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const Lugar = () => {
  const { register } = useFormContext();
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
      <DialogContentText>¿Dónde será el evento?</DialogContentText>
      <TextField
        required
        margin="dense"
        id="lugar"
        name="lugar"
        label="Lugar"
        type="text"
        fullWidth
        variant="outlined"
        {...register("lugar")}
      />
    </Box>
  );
};
