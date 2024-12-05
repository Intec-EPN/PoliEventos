import {
  Box,
  DialogContentText,
  Button,
  IconButton,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";
import { EsquemaCategoriaItem } from "./EsquemaCategoriaItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const EsquemaCategoria = ({ defaultValues }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);
  const { esquemasCategorias } = useSelector((state) => state.gestionEvento);
  const esquemas = esquemasCategorias ? esquemasCategorias.map((esquemaCategoria) => ({
    esquemaId: esquemaCategoria.esquemaId,
    esquemaNombre: esquemaCategoria.esquemaNombre,
    categorias: esquemaCategoria.categorias,
  })) : [];

  // Control de los campos
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "esquemasCategorias",
  });

  useEffect(() => {
    fields.forEach((field, index) => {
      const esquemaId = watch(`esquemasCategorias[${index}].esquemaId`);
      const categoriaId = watch(`esquemasCategorias[${index}].categoriaId`);
      setValue(`esquemasCategorias[${index}]`, {
        esquemaId,
        categoriaId,
      });
    });
  }, [fields, watch, setValue]);

  useEffect(() => {
    reset({
      esquemasCategorias: [],
    });
  }, [reset]);

  useEffect(() => {
    if (defaultValues) {
      reset({ esquemasCategorias: defaultValues });
    }
  }, [defaultValues, reset]);

  return (
    <Box sx={{my:1}}>
      <DialogContentText sx={{ color:"#333333" }}>Categorías del evento</DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          <EsquemaCategoriaItem
            index={index}
            esquemas={esquemas}
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={() =>
          append({
            esquemaId: "",
            categoriaId: "",
          })
        }
        sx={{width:"100%", display:"flex", justifyContent:"start", m:0, p:0}}
      >
        <AddCircleOutlineOutlinedIcon sx={{mt:0.4, color:"#0a3b91"}}/>
      </Button>
    </Box>
  );
};
