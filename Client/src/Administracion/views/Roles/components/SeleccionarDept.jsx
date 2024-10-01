import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { Grid2 } from '@mui/material';
import { dept } from '../../permisos';

const names = dept;

export const SeleccionarDept = () => {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid2 container  mb={2}>
      <FormControl >
        <InputLabel >Departamento</InputLabel>
        <Select
          multiple
          placeholder='Departamento'
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Departamento" />}
          sx={{width:220}}
          renderValue={(selected) => (
            <>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
  );
};
