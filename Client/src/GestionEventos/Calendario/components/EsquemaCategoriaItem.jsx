import { Box, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

export const EsquemaCategoriaItem = ({
  index,
  esquemas,
  register,
  watch,
  setValue,
}) => {
  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState(
    esquemas[0].esquemaId
  );
  const [categoriasEsquemaSeleccionado, setCategoriasEsquemaSeleccionado] =
    useState(
      esquemas
        .find((esquema) => esquema.esquemaId == esquemaSeleccionado)
        .categorias?.map((cat) => ({
          categoriaId: cat.categoriaId,
          categoriaNombre: cat.categoriaNombre,
        }))
    );

  useEffect(() => {
    setCategoriasEsquemaSeleccionado(
      esquemas
        .find((esquema) => esquema.esquemaId == esquemaSeleccionado)
        .categorias?.map((cat) => ({
          categoriaId: cat.categoriaId,
          categoriaNombre: cat.categoriaNombre,
        }))
    );
  }, [esquemaSeleccionado, esquemas]);

  return (
    <Box display={"flex"} sx={{ width: "100%" }} gap={1}>
      <Select
        defaultValue={esquemas[0].esquemaId}
        inputProps={{
          name: `esquemasCategorias[${index}].esquemaId`,
          id: `esquema-${index}`,
        }}
        sx={{ width: "50%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].esquemaId`)}
        onChange={(e) => {
          setEsquemaSeleccionado(e.target.value);
          setValue(`esquemasCategorias[${index}].esquemaId`, e.target.value);
        }}
      >
        {esquemas.map(({ esquemaId, esquemaNombre }) => (
          <MenuItem key={esquemaId} value={esquemaId}>
            {esquemaNombre}
          </MenuItem>
        ))}
      </Select>
      <Select
        defaultValue={categoriasEsquemaSeleccionado[0].categoriaId}
        inputProps={{
          name: `esquemasCategorias[${index}].categoriaId`,
          id: `categoria-${index}`,
        }}
        sx={{ width: "50%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].categoriaId`)}
        onChange={(e) => setValue(`esquemasCategorias[${index}].categoriaId`, e.target.value)}
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