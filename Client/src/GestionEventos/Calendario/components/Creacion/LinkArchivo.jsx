import { Box, TextField } from "@mui/material";
import { useFormContext, useFormState } from "react-hook-form";
import { useEffect } from "react";

export const LinkArchivo = ({ defaultValue }) => {
  const { register, setValue } = useFormContext();
  const { errors } = useFormState();

  useEffect(() => {
    if (defaultValue) {
      setValue("enlaces", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ width: "99%"}}>
      <TextField
        id="enlaces"
        name="enlaces"
        placeholder="Copia un enlace: https://"
        type="text"
        size="small"
        fullWidth
        variant="outlined"
        sx={{
          mt:"0.5rem",
          border: "0.2rem solid #0a3b91",
          borderRadius: "7px",
          width: "100%",
        }}
        {...register("enlaces", {
          pattern: {
            value: /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/,
            message: "Por favor ingrese un enlace válido."
          }
        })}
        error={!!errors.enlaces}
        helperText={errors.enlaces ? errors.enlaces.message : ""}
      />
    </Box>
  );
};
