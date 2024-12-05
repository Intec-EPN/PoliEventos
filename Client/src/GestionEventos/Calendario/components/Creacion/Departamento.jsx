import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { Box, DialogContentText, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { startLoadingDepartamentos } from '../../../../store/GestionEventos/thunk';

export const Departamento = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { departamentos } = useSelector((state) => state.gestionEvento);
  const { register, setValue, watch } = useFormContext();
  const departamento = watch('departamento') || [];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue('departamento', typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ width: '100%' }} mt={0.5}>
      <DialogContentText>Departamento</DialogContentText>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="departamento-label">Departamento</InputLabel>
        <Select
          labelId="departamento-label"
          id="departamento-select"
          multiple
          value={departamento}
          onChange={handleChange}
          input={<OutlinedInput label="Departamento" />}
          {...register('departamento')}
        >
          {departamentos.map((dep) => (
            <MenuItem key={dep.id} value={dep.id}>
              {dep.departamento}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};