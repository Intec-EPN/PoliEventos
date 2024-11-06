import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid2, List } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  actualizarEsquemaCategoriaActual,
  limpiarEsquemaCategorizacionActual,
} from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { AlertCorrecto } from "./AlertCorrecto";
import { CrearCatTituloDescrip } from "./CrearCatTituloDescrip";
import { startCreatingEsquema } from "../../../../../store/Administracion/Categorizacion/thunks";
import { AgregarCategorias } from "./AgregarCategorias";


export const CrearEsquema = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Obtengo la descripción
  const { esquemaCategorizacionActual } = useSelector(
    (state) => state.categorizacion
  );
  const { id, nombre, descripcion } = esquemaCategorizacionActual;

  // Para validaciones:
  const validarCategoria = (value) => {
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

  // Cancelar (volver)
  const onCancel = () => {
    dispatch(limpiarEsquemaCategorizacionActual());
    navigate(-1);
  };

  // TODO COMPONENTE NO UTILIZADO (?)
  return (
    <Box ml={3} mr={3}>
      <CrearCatTituloDescrip nombre={nombre} descripcion={descripcion} />
      <AgregarCategorias
        validarCategoria={validarCategoria}
        idEsquemaActual={id}
        crear={true}
        onCancelAgregar={onCancel}
      />
    </Box>
  );
};
