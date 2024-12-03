import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  DialogContentText,
  Button,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

export const Expositores = () => {
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "expositores",
  });

  useEffect(() => {
    fields.forEach((field, index) => {
      const nombre = watch(`expositores[${index}].nombre`);
      const mail = watch(`expositores[${index}].mail`);
      setValue(`expositores[${index}]`, {
        nombre,
        mail,
      });
    });
  }, [fields, watch, setValue]);

  useEffect(() => {
    reset({
      expositores: [],
    });
  }, [reset]);

  return (
    <>
      <DialogContentText>Expositores</DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          <TextField
            required
            margin="dense"
            id={`expositor-${index}`}
            name={`expositores[${index}].nombre`}
            label="Nombre del expositor"
            type="text"
            fullWidth
            variant="outlined"
            {...register(`expositores[${index}].nombre`)}
          />
          <TextField
            required
            margin="dense"
            id={`expositorMail-${index}`}
            name={`expositores[${index}].mail`}
            label="Correo del expositor"
            type="email"
            fullWidth
            variant="outlined"
            {...register(`expositores[${index}].mail`)}
          />
        </Box>
      ))}
      <Button onClick={() => append({ nombre: "", mail: "" })}>
        Agregar
      </Button>
    </>
  );
};