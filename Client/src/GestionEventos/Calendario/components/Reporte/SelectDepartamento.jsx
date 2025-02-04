import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Typography,
} from "@mui/material";
import { startLoadingDepartamentos } from "../../../../store/GestionEventos/thunk";

const SelectDepartamento = ({
  selectedDepartments,
  setSelectedDepartments,
}) => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("facultad");

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { nivelFacultad, nivelDepartamento, departamentoNivelId } = useSelector(
    (state) => state.adminAuth
  );
  const { departamentos } = useSelector((state) => state.gestionEvento);

  useEffect(() => {
    if (nivelDepartamento && departamentoNivelId) {
      setSelectedDepartments([departamentoNivelId]);
    } else {
      setSelectedDepartments(departamentos.map((dep) => dep.id));
    }
  }, [nivelDepartamento, departamentoNivelId, departamentos]);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDepartments([value]);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    if (event.target.value === "facultad") {
      setSelectedDepartments(
        departamentos ? departamentos.map((dep) => dep.id) : []
      );
    } else {
      setSelectedDepartments([]);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      {nivelFacultad && (
        <FormControl component="fieldset">
          <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
            Filtra por departamento
          </Typography>
          <RadioGroup row value={filterType} onChange={handleFilterTypeChange}>
            <FormControlLabel
              value="facultad"
              control={<Radio />}
              label="Facultad"
            />
            <FormControlLabel
              value="departamento"
              control={<Radio />}
              label="Departamento"
            />
          </RadioGroup>
        </FormControl>
      )}
      {nivelDepartamento && departamentoNivelId && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: "500",
            color: "#164dc9",
            fontSize: "1.1rem",
          }}
        >
          En departamento 
          {departamentos
            ? ` ${
                departamentos.find((dep) => dep.id === departamentoNivelId)
                  ?.departamento
              }`
            : "Departamento no encontrado"}
        </Typography>
      )}
      {nivelFacultad && filterType === "departamento" && (
        <FormControl sx={{ width: "100%", mt: 1.5 }}>
          <InputLabel id="departamento-label">Departamento</InputLabel>
          <Select
            labelId="departamento-label"
            id="departamento-select"
            value={selectedDepartments[0] || ""}
            onChange={handleChange}
            input={<OutlinedInput label="Departamento" />}
            renderValue={(selected) => {
              if (!selected) {
                return <em>Departamento</em>;
              }
              const dep = departamentos
                ? departamentos.find((dep) => dep.id === selected)
                : null;
              return dep ? dep.departamento : selected;
            }}
          >
            {departamentos &&
              departamentos.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.departamento}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default SelectDepartamento;