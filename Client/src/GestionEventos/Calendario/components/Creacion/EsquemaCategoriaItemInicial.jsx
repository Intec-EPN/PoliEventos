import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export const EsquemaCategoriaItemInicial = ({ esquemas, index, onRemove }) => {
  const { watch, setValue } = useFormContext();
  const esquemaInicial = watch(`esquemasCategorias[${index}].esquemaId`) || "";
  const categoriaInicial = watch(`esquemasCategorias[${index}].categoriaId`) || "";

  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState(esquemaInicial);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);

  const { esquemasCategorias } = useSelector((state) => state.gestionEvento);
  const esquemasCompletos = esquemasCategorias
    ? esquemasCategorias.map((esquemaCategoria) => ({
        esquemaId: esquemaCategoria.esquemaId,
        esquemaNombre: esquemaCategoria.esquemaNombre,
        categorias: esquemaCategoria.categorias,
      }))
    : [];

  useEffect(() => {
    if (esquemaInicial && categoriaInicial) {
      setEsquemaSeleccionado(esquemaInicial);
      setCategoriaSeleccionada(categoriaInicial);
    }
  }, [esquemaInicial, categoriaInicial]);

  useEffect(() => {
    setValue(`esquemasCategorias[${index}].esquemaId`, esquemaSeleccionado);
    setValue(`esquemasCategorias[${index}].categoriaId`, categoriaSeleccionada);
  }, [esquemaSeleccionado, categoriaSeleccionada, index, setValue]);

  const esquema = esquemasCompletos.find((esquema) => esquema.esquemaId === esquemaSeleccionado);
  const esquemaNombre = esquema ? esquema.esquemaNombre : "N/A";
  const categoria = esquema ? esquema.categorias.find((categoria) => categoria.categoriaId === categoriaSeleccionada) : null;
  const categoriaNombre = categoria ? categoria.categoriaNombre : "N/A";

  return (
    <Box display={"flex"} sx={{ width: "98%" }} gap={1} mb={1}>
      <Paper sx={{ width: "45%", mt: 0.5, p: 1, backgroundColor: "#fff", display:"flex", alignItems:"center", border:"1.5px solid #dfdfdf", boxShadow:"none" }}>
        <Typography>
          {esquemaNombre}
        </Typography>
      </Paper>
      <Paper sx={{ width: "45%", mt: 0.5, p: 1, backgroundColor: "#fff", display:"flex", alignItems:"center", border:"1.5px solid #dfdfdf", boxShadow:"none" }}>
        <Typography>
          {categoriaNombre}
        </Typography>
      </Paper>
      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};