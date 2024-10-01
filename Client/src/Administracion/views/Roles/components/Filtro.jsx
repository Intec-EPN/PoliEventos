import { Autocomplete, createFilterOptions, TextField } from "@mui/material";



const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option,
  });
  
export const Filtro = ({opciones=[], filtro = '', size}) => {
  return (
    <>
      <Autocomplete
        options={opciones}
        getOptionLabel={(option) => option}
        filterOptions={filterOptions}
        sx={{ width: size}}
        renderInput={(params) => (
          <TextField {...params} label={filtro} />
        )}
      />
    </>
  );
};
