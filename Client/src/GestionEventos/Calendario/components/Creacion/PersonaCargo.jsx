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

export const PersonaCargo = () => {
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "personasCargo",
  });

  useEffect(() => {
    fields.forEach((field, index) => {
      const nombre = watch(`personasCargo[${index}].nombre`);
      const mail = watch(`personasCargo[${index}].mail`);
      setValue(`personasCargo[${index}]`, {
        nombre,
        mail,
      });
    });
  }, [fields, watch, setValue]);

  useEffect(() => {
    reset({
      personasCargo: [],
    });
  }, [reset]);

  return (
    <>
      <DialogContentText>Persona a cargo</DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          <TextField
            required
            margin="dense"
            id={`encargado-${index}`}
            name={`personasCargo[${index}].nombre`}
            label="Nombre del encargado"
            type="text"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].nombre`)}
          />
          <TextField
            required
            margin="dense"
            id={`encargadoMail-${index}`}
            name={`personasCargo[${index}].mail`}
            label="Correo del encargado"
            type="email"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].mail`)}
          />
        </Box>
      ))}
      <Button onClick={() => append({ nombre: "", mail: "" })}>
        Agregar
      </Button>
    </>
  );
};