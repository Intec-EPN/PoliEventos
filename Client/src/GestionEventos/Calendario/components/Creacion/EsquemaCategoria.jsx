import { Box, DialogContentText, Button, IconButton } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";
import { EsquemaCategoriaItem } from "./EsquemaCategoriaItem";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

export const EsquemaCategoria = ({
  defaultValues,
  isFromModalEvento,
  isReset,
}) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(isFromModalEvento ? true : false);
  const [availableEsquemas, setAvailableEsquemas] = useState([]);

  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);

  const { esquemasCategorias } = useSelector((state) => state.gestionEvento);
  const esquemas = esquemasCategorias
    ? esquemasCategorias.map((esquemaCategoria) => ({
        esquemaId: esquemaCategoria.esquemaId,
        esquemaNombre: esquemaCategoria.esquemaNombre,
        categorias: esquemaCategoria.categorias,
      }))
    : [];

  // Control de los campos
  const { control, reset, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "esquemasCategorias",
  });

  const handleRemove = (index) => {
    const currentValues = getValues("esquemasCategorias");
    currentValues.splice(index, 1);
    setValue("esquemasCategorias", currentValues);
    remove(index);
  };

  useEffect(() => {
    const selectedEsquemas = fields.map((field) => field.esquemaId);
    setAvailableEsquemas(
      esquemas.filter(
        (esquema) => !selectedEsquemas.includes(esquema.esquemaId)
      )
    );
  }, [fields]);

  useEffect(() => {
    if (!editMode && isReset) {
      setValue("esquemasCategorias", defaultValues);
    }
  }, [editMode, fields, setValue, defaultValues, isReset]);

  useEffect(() => {
    if (!editMode && isReset) {
      setValue("esquemasCategorias", defaultValues);
    }
  }, [editMode, setValue, defaultValues, isReset]);

  return (
    <Box sx={{ my: 1 }}>
      <DialogContentText sx={{ color: "#333333" }}>
        Categorías del evento*
      </DialogContentText>
      {fields.map((field, index) => (
        <Box key={field.id} display={"flex"} width={{xs: "80%",sm:"90%", md: "100%", lg: "100%", xl:"100%" }} gap={1}>
          <EsquemaCategoriaItem
            index={index}
            esquemas={[...availableEsquemas, ...esquemas.filter(e => e.esquemaId === field.esquemaId)]}
          />
          <IconButton onClick={() => handleRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {editMode && (
        <Button
          onClick={() => {
            append({
              esquemaId: "",
              categoriaId: "",
            });
          }}
          sx={{ display: "flex", justifyContent: "start", m: 0, p: 0 }}
        >
          <AddCircleOutlineOutlinedIcon sx={{ mt: 0.4, color: "#0a3b91" }} />
        </Button>
      )}
    </Box>
  );
};
