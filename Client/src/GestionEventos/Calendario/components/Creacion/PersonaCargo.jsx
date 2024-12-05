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


export const PersonaCargo = ({ defaultValues }) => {
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "personasCargo",
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ personasCargo: defaultValues });
    } else {
      reset({ personasCargo: [] });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    fields.forEach((field, index) => {
      setValue(`personasCargo[${index}].nombre`, field.nombre);
      setValue(`personasCargo[${index}].mail`, field.mail);
    });
  }, [fields, setValue]);

  return (
    <Box sx={{my:1}}>
      <DialogContentText sx={{ color:"#333333" }}>Personal a cargo</DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          <TextField
            required
            margin="dense"
            id={`encargado-${index}`}
            name={`personasCargo[${index}].nombre`}
            placeholder="Nombre del encargado"
            type="text"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].nombre`)}
          />
          <TextField
            margin="dense"
            id={`encargadoMail-${index}`}
            name={`personasCargo[${index}].mail`}
            placeholder="Correo del encargado"
            type="email"
            fullWidth
            variant="outlined"
            {...register(`personasCargo[${index}].mail`)}
          />
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => append({ nombre: "", mail: "" })} sx={{width:"100%", display:"flex", justifyContent:"start", m:0, p:0}}>
        <AddCircleOutlineOutlinedIcon sx={{color:"#0a3b91"}}/>
      </Button>
    </Box>
  );
};