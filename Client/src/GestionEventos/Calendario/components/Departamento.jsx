import { useDispatch, useSelector } from "react-redux";
import { startLoadingDepartamentos } from "../../../store/GestionEventos/thunk";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Box, DialogContentText, Autocomplete, TextField } from "@mui/material";

export const Departamento = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { departamentos } = useSelector((state) => state.gestionEvento);

  const { register, setValue, watch } = useFormContext();
  const departamento = watch("departamento") || [];

  useEffect(() => {
    if (departamentos.length > 0 && departamento.length === 0) {
      setValue("departamento", [departamentos[0].id]);
    }
  }, [departamentos, departamento, setValue]);

  const handleChange = (event, value) => {
    setValue("departamento", value.map(dep => dep.id));
  };

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>
      <DialogContentText>Departamento</DialogContentText>
      <Autocomplete
        multiple
        options={departamentos}
        getOptionLabel={(option) => option.departamento}
        value={departamentos.filter(dep => departamento.includes(dep.id))}
        onChange={handleChange}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <span key={index} {...getTagProps({ index })}>
            {option.departamento}
            {index < value.length - 1 && ', '}
          </span>
        ))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Departamento"
            variant="outlined"
            {...register("departamento")}
          />
        )}
        sx={{ width: "100%", mt: 0.5 }}
      />
    </Box>
  );
};