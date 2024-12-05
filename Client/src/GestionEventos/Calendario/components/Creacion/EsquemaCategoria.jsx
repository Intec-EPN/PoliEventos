import {
  Box,
  Select,
  MenuItem,
  DialogContentText,
  Button,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";
import { EsquemaCategoriaItem } from "./EsquemaCategoriaItem";

export const EsquemaCategoria = ({ defaultValues }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);
  const { esquemasCategorias } = useSelector((state) => state.gestionEvento);
  const esquemas = esquemasCategorias.map((esquemaCategoria) => ({
    esquemaId: esquemaCategoria.esquemaId,
    esquemaNombre: esquemaCategoria.esquemaNombre,
    categorias: esquemaCategoria.categorias,
  }));

  // Control de los campos
  const { register, control, setValue, watch, reset } = useFormContext();
  const { fields, append } = useFieldArray({
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
    <>
      <DialogContentText>Esquema y Categoría</DialogContentText>
      {fields.map((field, index) => (
        <EsquemaCategoriaItem
          key={field.id}
          index={index}
          esquemas={esquemas}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      ))}
      <Button
        onClick={() =>
          append({
            esquemaId: esquemas[0]?.esquemaId || "",
            categoriaId: esquemas[0]?.categorias[0]?.categoriaId || "",
          })
        }
      >
        Agregar
      </Button>
    </>
  );
};
