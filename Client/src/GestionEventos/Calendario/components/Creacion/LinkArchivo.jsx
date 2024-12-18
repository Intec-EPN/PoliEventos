import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const LinkArchivo = ({ defaultValue }) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue("enlaces", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
      <TextField
        id="enlaces"
        name="enlaces"
        placeholder="Copia un enlace: https://"
        type="text"
        fullWidth
        variant="outlined"
        sx={{
          mt:"0.5rem",
          border: "0.2rem solid #0a3b91",
          borderRadius: "7px",
          width: "100%",
        }}
        {...register("enlaces")}
      />
    </Box>
  );
};
