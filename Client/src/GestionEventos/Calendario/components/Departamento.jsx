import { Box, DialogContentText, MenuItem, Select } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingDepartamentos } from "../../../store/GestionEventos/thunk";

export const Departamento = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { departamentos } = useSelector((state) => state.gestionEvento);

  const { register, setValue, watch } = useFormContext();
  const departamento = watch("departamento");

  useEffect(() => {
    if (departamentos.length > 0) {
      setValue("departamento", departamentos[0].id);
    }
  }, [departamento, setValue]);

  const handleChange = (event) => {
    setValue("departamento", event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }} mt={0.5}>
      <DialogContentText>Departamento</DialogContentText>
      <Select
        value={departamento}
        onChange={handleChange}
        inputProps={{
          name: "departamento",
          id: "uncontrolled-native",
        }}
        sx={{ width: "100%", mt: 0.5 }}
        {...register("departamento")}
      >
        {departamentos.map(({ id, departamento }) => (
          <MenuItem key={id} value={id}>
            {departamento}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
