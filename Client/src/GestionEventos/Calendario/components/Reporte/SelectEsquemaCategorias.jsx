import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";

const SelectEsquemaCategorias = ({
  selectedEsquemaCategoria,
  setSelectedEsquemaCategoria,
}) => {
  const dispatch = useDispatch();
  const [esquemaId, setEsquemaId] = useState(null);

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
      }))
    : [];

  const handleEsquemaChange = (event) => {
    const selectedEsquema = event.target.value;
    setEsquemaId(selectedEsquema);
    setSelectedEsquemaCategoria([{ esquemaId: selectedEsquema, categoriaId: null }]);
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: "0.9rem" }}>
        Filtra por categorización
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <FormControl sx={{ width: "100%"}}>
          <InputLabel id="esquema-label">Esquema</InputLabel>
          <Select
            labelId="esquema-label"
            id="esquema-select"
            value={esquemaId || ""}
            onChange={handleEsquemaChange}
            label="Esquema"
          >
            {esquemasCategorias.map((esquema) => (
              <MenuItem key={esquema.value} value={esquema.value}>
                {esquema.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectEsquemaCategorias;
