import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const EsquemaCategoriaItem = ({ esquemas, index }) => {
  const { register, setValue, watch } = useFormContext();
  const esquemasCategorias = watch(`esquemasCategorias`);
  const esquemasSeleccionados = esquemasCategorias ? esquemasCategorias.map((e) => e.esquemaId) : [];

  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState("");
  const [categoriasEsquemaSeleccionado, setCategoriasEsquemaSeleccionado] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    const esquema = esquemas.find((esquema) => esquema.esquemaId == esquemaSeleccionado);
    setCategoriasEsquemaSeleccionado(esquema ? esquema.categorias : []);
  }, [esquemaSeleccionado, esquemas]);

  useEffect(() => {
    const esquemaInicial = watch(`esquemasCategorias[${index}].esquemaId`) || "";
    const categoriaInicial = watch(`esquemasCategorias[${index}].categoriaId`) || "";
    setEsquemaSeleccionado(esquemaInicial);
    setCategoriaSeleccionada(categoriaInicial);
  }, [index, watch]);

  return (
    <Box display={"flex"} sx={{ width: "100%" }} gap={1}>
      <Select
        value={esquemaSeleccionado}
        displayEmpty
        inputProps={{
          name: `esquemasCategorias[${index}].esquemaId`,
          id: `esquema-${index}`,
        }}
        sx={{ flex: "1", maxWidth: "49%", minWidth: "49%", width: "100%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].esquemaId`)}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setEsquemaSeleccionado(selectedValue);
          setValue(`esquemasCategorias[${index}].esquemaId`, selectedValue);
          setCategoriasEsquemaSeleccionado(esquemas.find((esquema) => esquema.esquemaId == selectedValue)?.categorias || []);
          setCategoriaSeleccionada("");
          setValue(`esquemasCategorias[${index}].categoriaId`, "");
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
        value={categoriaSeleccionada}
        inputProps={{
          name: `esquemasCategorias[${index}].categoriaId`,
          id: `categoria-${index}`,
        }}
        sx={{ flex: "1", maxWidth: "49%",width: "100%", mt: 0.5 }}
        {...register(`esquemasCategorias[${index}].categoriaId`)}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setCategoriaSeleccionada(selectedValue);
          setValue(`esquemasCategorias[${index}].categoriaId`, selectedValue);
        }}
      >
        <MenuItem value="" disabled>
          Selecciona una categoría
        </MenuItem>
        {categoriasEsquemaSeleccionado.map(({ categoriaId, categoriaNombre }) => (
          <MenuItem key={categoriaId} value={categoriaId}>
            {categoriaNombre}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
