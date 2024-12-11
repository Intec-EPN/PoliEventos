import {
  Box,
  TextField,
  DialogContentText,
  Button,
  IconButton,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const Expositores = ({ defaultValues }) => {
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "expositores",
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ expositores: defaultValues });
    } else {
      reset({ expositores: [] });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    fields.forEach((field, index) => {
      setValue(`expositores[${index}].nombre`, field.nombre);
      setValue(`expositores[${index}].mail`, field.mail);
    });
  }, [fields, setValue]);

  return (
    <Box sx={{my:1}}>
      <DialogContentText sx={{ color:"#333333" }}>Expositores</DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          <TextField
            required
            margin="dense"
            id={`expositor-${index}`}
            name={`expositores[${index}].nombre`}
            placeholder="Nombre del expositor*"
            type="text"
            fullWidth
            variant="outlined"
            {...register(`expositores[${index}].nombre`)}
          />
          <TextField
            margin="dense"
            id={`expositorMail-${index}`}
            name={`expositores[${index}].mail`}
            placeholder="Correo del expositor"
            type="email"
            fullWidth
            variant="outlined"
            {...register(`expositores[${index}].mail`)}
          />
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => append({ nombre: "", mail: "" })} sx={{ display:"flex", justifyContent:"start", m:0, p:0}}>
        <AddCircleOutlineOutlinedIcon sx={{color:"#0a3b91"}} />
      </Button>
    </Box>
  );
};