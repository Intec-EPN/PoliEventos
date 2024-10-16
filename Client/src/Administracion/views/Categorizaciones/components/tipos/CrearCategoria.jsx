import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid2, List } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  actualizarEsquemaCategoriaActual,
  limpiarEsquemaCategorizacionActual,
} from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { AlertCorrecto } from "./AlertCorrecto";
import { NuevoTipoItem } from "./NuevoTipoItem";
import { CatTituloDescrip } from "./CatTituloDescrip";
import { startCreatingEsquema } from "../../../../../store/Administracion/Categorizacion/thunks";

export const CrearCategoria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtengo la descripción
  const { esquemaCategorizacionActual } = useSelector(
    (state) => state.categorizacion
  );
  const { nombre, descripcion } = esquemaCategorizacionActual;

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

  // Estado para saber si estoy editando
  const [editCategoria, setEditCategoria] = useState(false);

  const onNuevoTipo = () => {
    setNuevosTipos([...nuevosTipos, ""]);
    setEditCategoria(true);
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
    setEditCategoria(false);
  };

  // Cancelar (volver)
  const onCancel = () => {
    dispatch(limpiarEsquemaCategorizacionActual());
    navigate(-1);
  };

  // Gestión de errores del formulario:
  const validateTipo = (value) => {
    if (!value) {
      // Devuelve un mensaje de error si está vacío
      return "Este campo es obligatorio";
    }
    const regex = /^[A-Za-z0-9\s.,;:'"()?!&%$@/-áéíóúñÁÉÍÓÚÑ]+$/;
    if (!regex.test(value)) {
      // Mensaje de error si no coincide con el regex
      return "Solo se permiten letras, números y puntuación";
    }
    // Pasa la validación.
    return true;
  };

  return (
    <Box ml={3} mr={3}>
      <CatTituloDescrip categoriaActual={nombre} descripcion={descripcion} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <List sx={{ width: "100%" }}>
          <Grid2 container>
            {nuevosTipos.map((categoria, index) => (
              <NuevoTipoItem
                key={index}
                index={index}
                tipo={categoria}
                editTipo={true}
                control={control}
                errors={errors}
                validateTipo={validateTipo}
                onEliminarTipo={onEliminarTipo}
              />
            ))}
          </Grid2>
        </List>

        <Box display="flex" justifyContent="left">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            onClick={handleSubmit(onNuevoTipo)}
          >
            Agregar categoría
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            type="submit"
            disabled={!editCategoria}
          >
            Guardar
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#e3320e", mb: 2, mr: 2 }}
            onClick={onCancel}
          >
            {
              editCategoria ? "Cancelar" : "Regresar"
            }
          </Button>
        </Box>

        {alertOpen && <AlertCorrecto openT={alertOpen} />}
      </form>
    </Box>
  );
};
