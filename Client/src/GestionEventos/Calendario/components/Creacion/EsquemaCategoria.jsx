import {
  Box,
  DialogContentText,
  Button,
  IconButton,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";
import { EsquemaCategoriaItem } from "./EsquemaCategoriaItem";
import { EsquemaCategoriaItemInicial } from "./EsquemaCategoriaItemInicial";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const EsquemaCategoria = ({ isFromModalEvento }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(isFromModalEvento ? true : false);

  useEffect(() => {
    console.log("Loading esquemas categorias");
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);

  const { esquemasCategorias } = useSelector((state) => state.gestionEvento);
  const esquemas = esquemasCategorias ? esquemasCategorias.map((esquemaCategoria) => ({
    esquemaId: esquemaCategoria.esquemaId,
    esquemaNombre: esquemaCategoria.esquemaNombre,
    categorias: esquemaCategoria.categorias,
  })) : [];

  // Control de los campos
  const { control, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "esquemasCategorias",
  });

  const handleReset = () => {
    console.log("Resetting categories");
    setEditMode(true);
    reset({
      esquemasCategorias: [],
    });
  };

  console.log("Rendering EsquemaCategoria with editMode:", editMode);

  return (
    <Box sx={{ my: 1 }}>
      <Box display="flex" alignItems="center">
        <DialogContentText sx={{ color: "#333333" }}>Categorías del evento</DialogContentText>
        {!isFromModalEvento && (
          <IconButton onClick={handleReset} sx={{m:0, p:0.4}}>
            <RestartAltIcon sx={{color: "#0a3b91", width:"1.3rem"}} />
          </IconButton>
        )}
      </Box>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} sx={{ width: "100%" }} gap={1}>
          {editMode ? (
            <EsquemaCategoriaItem index={index} esquemas={esquemas} />
          ) : (
            <EsquemaCategoriaItemInicial index={index} esquemas={esquemas} />
          )}
          {editMode && (
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      {editMode && (
        <Button
          onClick={() =>
            append({
              esquemaId: "",
              categoriaId: "",
            })
          }
          sx={{ width: "100%", display: "flex", justifyContent: "start", m: 0, p: 0 }}
        >
          <AddCircleOutlineOutlinedIcon sx={{ mt: 0.4, color: "#0a3b91" }} />
        </Button>
      )}
    </Box>
  );
};
