import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";

const SelectEsquemaCategorias = ({
  selectedEsquemaCategoria,
  setSelectedEsquemaCategoria,
}) => {
  const dispatch = useDispatch();
  const [esquemaCategoriaList, setEsquemaCategoriaList] = useState([
    { esquemaId: null, categoriaId: null },
  ]);

  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);

  const { esquemasCategorias: esquemasCategoriasCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const esquemasCategorias = esquemasCategoriasCargados
    ? esquemasCategoriasCargados.map((esquemaCategoria) => ({
        value: esquemaCategoria.esquemaId,
        label: esquemaCategoria.esquemaNombre,
        categorias: esquemaCategoria.categorias.map((categoria) => ({
          value: categoria.categoriaId,
          label: categoria.categoriaNombre,
        })),
      }))
    : [];

  const handleEsquemaChange = (index, event) => {
    const selectedEsquema = esquemasCategorias.find(
      (esquema) => esquema.value === event.target.value
    );
    const newEsquemaCategoriaList = esquemaCategoriaList.map((item, i) =>
      i === index
        ? { esquemaId: selectedEsquema.value, categoriaId: null }
        : item
    );
    setEsquemaCategoriaList(newEsquemaCategoriaList);
    setSelectedEsquemaCategoria(newEsquemaCategoriaList);
  };

  const handleCategoriaChange = (index, event) => {
    const newEsquemaCategoriaList = esquemaCategoriaList.map((item, i) =>
      i === index ? { ...item, categoriaId: event.target.value } : item
    );
    setEsquemaCategoriaList(newEsquemaCategoriaList);
    setSelectedEsquemaCategoria(newEsquemaCategoriaList);
  };

  const handleAddEsquemaCategoria = () => {
    setEsquemaCategoriaList([
      ...esquemaCategoriaList,
      { esquemaId: null, categoriaId: null },
    ]);
  };

  const handleDeleteEsquemaCategoria = (index) => {
    const newEsquemaCategoriaList = esquemaCategoriaList.filter(
      (_, i) => i !== index
    );
    setEsquemaCategoriaList(newEsquemaCategoriaList);
    setSelectedEsquemaCategoria(newEsquemaCategoriaList);
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: "0.9rem" }}>
        Filtra por categorización
      </Typography>
      {esquemaCategoriaList.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <FormControl sx={{ width: "45%", mr: 1.5 }}>
            <InputLabel id={`esquema-label-${index}`}>Esquema</InputLabel>
            <Select
              labelId={`esquema-label-${index}`}
              id={`esquema-select-${index}`}
              value={item.esquemaId || ""}
              onChange={(event) => handleEsquemaChange(index, event)}
              label="Esquema"
            >
              {esquemasCategorias.map((esquema) => (
                <MenuItem key={esquema.value} value={esquema.value}>
                  {esquema.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "45%", mr: 1.5 }}>
            <InputLabel id={`categoria-label-${index}`}>Categoría</InputLabel>
            <Select
              labelId={`categoria-label-${index}`}
              id={`categoria-select-${index}`}
              value={item.categoriaId || ""}
              onChange={(event) => handleCategoriaChange(index, event)}
              label="Categoría"
              disabled={!item.esquemaId}
            >
              {item.esquemaId &&
                esquemasCategorias
                  .find((esquema) => esquema.value === item.esquemaId)
                  ?.categorias.map((categoria) => (
                    <MenuItem key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => handleDeleteEsquemaCategoria(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={handleAddEsquemaCategoria}
        sx={{ display: "flex", justifyContent: "start", m: 0, p: 0 }}
      >
        <AddCircleOutlineOutlinedIcon sx={{ mt: 0.4, color: "#0a3b91" }} />
      </Button>
    </Box>
  );
};

export default SelectEsquemaCategorias;
