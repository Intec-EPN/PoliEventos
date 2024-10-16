import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid2, List } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { actualizarEsquemaCategoriaActual, limpiarEsquemaCategorizacionActual } from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { AlertCorrecto } from "./AlertCorrecto";
import { NuevoTipoItem } from "./NuevoTipoItem";
import { CatTituloDescrip } from "./CatTituloDescrip";
import {
  startCreatingEsquema
} from "../../../../../store/Administracion/Categorizacion/thunks";

export const CrearCategoria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtengo la descripción
  const {esquemaCategorizacionActual} = useSelector((state) => state.categorizacion);
  const {nombre, descripcion} = esquemaCategorizacionActual;
  
  // Estado para controlar nuevos tipos
  const [nuevosTipos, setNuevosTipos] = useState([]);

  // Alerta de éxito
  const [alertOpen, setAlertOpen] = useState(false);

  // Uso del formulario a través de react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Función para agregar un nuevo tipo
  const onNuevoTipo = () => {
    setNuevosTipos([...nuevosTipos, ""]); // Agregar un nuevo tipo vacío
  };

  // Función para eliminar un tipo
  const onEliminarTipo = (index) => {
    const updatedTipos = nuevosTipos.filter((_, i) => i !== index);
    setNuevosTipos(updatedTipos);
  };

  // SUBMIT FORMULARIO
  const onSubmit = (data) => {

    const categoriasNuevasData = data.nuevosTipos || [];
    const categoriasNuevas = categoriasNuevasData.map((nuevo) => ({
      nombre: nuevo,
      visible: true, 
    }));
    dispatch(actualizarEsquemaCategoriaActual(categoriasNuevas));
    dispatch(startCreatingEsquema());
    dispatch(limpiarEsquemaCategorizacionActual());
    setAlertOpen(true);
  };

  // Cancelar (volver)
  const onCancel = () => {
    dispatch(limpiarEsquemaCategorizacionActual());
    navigate(-1);
  };

  return (
    <Box ml={3} mr={3}>
      <CatTituloDescrip
        categoriaActual={nombre}
        descripcion={descripcion}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          sx={{ mr: 1, backgroundColor: "#e3320e" }}
          variant="contained"
          onClick={onCancel}
        >
          <ArrowBackIosIcon sx={{ width: "15px" }} />
          Retroceder
        </Button>

        <List sx={{ width: "100%" }}>
          <Grid2 container>
            {nuevosTipos.map((tipo, index) => (
              <NuevoTipoItem
                key={index}
                editTipo={true}
                index={index}
                tipo={tipo}
                control={control} 
                errors={errors} 
                onEliminarTipo={onEliminarTipo}
              />
            ))}
          </Grid2>
        </List>

        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            onClick={onNuevoTipo}
          >
            Agregar Tipo
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            type="submit"
          >
            Guardar
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#e3320e" }}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Box>

        {alertOpen && <AlertCorrecto openT={alertOpen} />}
      </form>
    </Box>
  );
};
