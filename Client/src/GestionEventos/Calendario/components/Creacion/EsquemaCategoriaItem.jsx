import React, { useEffect, useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import { useFormContext, useWatch, useFieldArray } from "react-hook-form";

export const EsquemaCategoriaItem = ({ esquemas, index }) => {
  const { register, setValue, watch, control } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: "esquemasCategorias",
  });
  const esquemasCategorias = watch(`esquemasCategorias`);
  const esquemasSeleccionados = esquemasCategorias ? esquemasCategorias.map((e) => e.esquemaId) : [];
  const esquemaInicial = ""; // Eliminar valor por defecto

  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState(
    esquemaInicial
  );
  const [categoriasEsquemaSeleccionado, setCategoriasEsquemaSeleccionado] =
    useState([]);

  useEffect(() => {
    const esquema = esquemas.find(
      (esquema) => esquema.esquemaId == esquemaSeleccionado
    );
    setCategoriasEsquemaSeleccionado(esquema ? esquema.categorias : []);
  }, [esquemaSeleccionado, esquemas]);

  useEffect(() => {
    if (categoriasEsquemaSeleccionado.length > 0) {
      setValue(
        `esquemasCategorias[${index}].categoriaId`,
        categoriasEsquemaSeleccionado[0].categoriaId
      );
    } else {
      setValue(`esquemasCategorias[${index}].categoriaId`, "");
    }
  }, [categoriasEsquemaSeleccionado, index, setValue]);

  useEffect(() => {
    if (!esquemasSeleccionados.includes(esquemaSeleccionado)) {
      setEsquemaSeleccionado("");
      setValue(`esquemasCategorias[${index}].esquemaId`, "");
    }
  }, [esquemasSeleccionados, esquemaSeleccionado, esquemas, setValue, index]);

  return (
    <Box display={"flex"} sx={{ width: "100%" }} gap={1}>
      <Select
        value={esquemaSeleccionado || ""}
        displayEmpty
        inputProps={{
          name: `esquemasCategorias[${index}].esquemaId`,
          id: `esquema-${index}`,
        }}
        sx={{ width: "50%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].esquemaId`)}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setEsquemaSeleccionado(selectedValue);
          setValue(`esquemasCategorias[${index}].esquemaId`, selectedValue);
        }}
      >
        <MenuItem value="" disabled>
          Selecciona un esquema
        </MenuItem>
        {esquemas.map(({ esquemaId, esquemaNombre }) => (
          <MenuItem
            key={esquemaId}
            value={esquemaId}
            disabled={esquemasSeleccionados.includes(esquemaId)}
          >
            {esquemaNombre}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={watch(`esquemasCategorias[${index}].categoriaId`) || ""}
        inputProps={{
          name: `esquemasCategorias[${index}].categoriaId`,
          id: `categoria-${index}`,
        }}
        sx={{ width: "50%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].categoriaId`)}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setValue(`esquemasCategorias[${index}].categoriaId`, selectedValue);
        }}
      >
        {categoriasEsquemaSeleccionado?.map(
          ({ categoriaId, categoriaNombre }) => (
            <MenuItem key={categoriaId} value={categoriaId}>
              {categoriaNombre}
            </MenuItem>
          )
        )}
      </Select>
    </Box>
  );
};
