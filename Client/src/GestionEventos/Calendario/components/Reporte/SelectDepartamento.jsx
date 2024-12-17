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
  const [filterType, setFilterType] = useState("departamento");

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { nivelFacultad, nivelDepartamento, departamentoNivelId } = useSelector(
    (state) => state.adminAuth
  );
  const { departamentos } = useSelector((state) => state.gestionEvento);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDepartments(
      typeof value === "string" ? value.split(",") : value
    );
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
          <RadioGroup row value={filterType} onChange={handleFilterTypeChange}>
            <FormControlLabel
              value="departamento"
              control={<Radio />}
              label="Departamento"
            />
            <FormControlLabel
              value="facultad"
              control={<Radio />}
              label="Facultad"
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
            ml:1
          }}
        >
          En
          {departamentos
            ? ` ${
                departamentos.find((dep) => dep.id === departamentoNivelId)
                  ?.departamento
              }`
            : "Departamento no encontrado"}
        </Typography>
      )}
      {nivelFacultad && filterType === "departamento" && (
        <FormControl sx={{ width: "100%", mt:1.5 }}>
          <InputLabel id="departamento-label">Departamento/s</InputLabel>
          <Select
            labelId="departamento-label"
            id="departamento-select"
            multiple
            value={selectedDepartments}
            onChange={handleChange}
            input={<OutlinedInput label="Departamento/s" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Departamento/s</em>;
              }
              return selected
                .map((value) => {
                  const dep = departamentos
                    ? departamentos.find((dep) => dep.id === value)
                    : null;
                  return dep ? dep.departamento : value;
                })
                .join(", ");
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
