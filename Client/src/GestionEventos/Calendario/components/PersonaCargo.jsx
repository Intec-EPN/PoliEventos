import { Box, Checkbox, FormControlLabel, TextField, DialogContentText, Button } from "@mui/material";
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
      const encargado = watch(`personasCargo[${index}].encargado`);
      const encargadoMail = watch(`personasCargo[${index}].encargadoMail`);
      const expositor = watch(`personasCargo[${index}].expositor`);
      setValue(`personasCargo[${index}]`, {
        encargado,
        encargadoMail,
        expositor,
      });
    });
  }, [fields, watch, setValue]);

  useEffect(() => {
    reset({
      personasCargo: []
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
            name={`personasCargo[${index}].encargado`}
            label="Nombre del encargado"
            type="text"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].encargado`)}
          />
          <TextField
            required
            margin="dense"
            id={`encargadoMail-${index}`}
            name={`personasCargo[${index}].encargadoMail`}
            label="Correo del encargado"
            type="email"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].encargadoMail`)}
          />
          <FormControlLabel
            control={<Checkbox {...register(`personasCargo[${index}].expositor`)} />}
            label="Expositor"
          />
        </Box>
      ))}
      <Button onClick={() => append({ encargado: "", encargadoMail: "", expositor: false })}>
        Agregar
      </Button>
    </>
  );
};