import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete'; // Importar el ícono de eliminar
import { useForm } from "react-hook-form";
import { useState } from "react";

export const EditarCategoria = () => {
  const { categoria } = useParams(); // Obtener el parámetro de la URL

  // Obtener las categorías del estado de Redux
  const { categorias } = useSelector((state) => state.categorias);
  const listCategoria = categorias.filter((x) => x.Nombre === categoria);
  const { Tipo: listItem } = listCategoria[0];

  // Use Form para Field
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Editar tipo
  const [editTipo, setEditTipo] = useState(false);
  const onEdit = () => {
    setEditTipo(true);
  };

  // Arreglo para nuevos tipos
  const [nuevosTipos, setNuevosTipos] = useState([]);

  const onNuevoTipo = () => {
    setNuevosTipos([...nuevosTipos, ""]); // Añade un nuevo campo vacío al arreglo
  };

  const onTipoChange = (index, value) => {
    const updatedTipos = [...nuevosTipos];
    updatedTipos[index] = value; // Actualiza el valor del tipo en la posición correspondiente
    setNuevosTipos(updatedTipos);
  };

  const onEliminarTipo = (index) => {
    const updatedTipos = nuevosTipos.filter((_, i) => i !== index); // Elimina el tipo en la posición correspondiente
    setNuevosTipos(updatedTipos);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(nuevosTipos); // Muestra los nuevos tipos agregados
  };

  return (
    <Box ml={3} mr={3}>
      <Typography
        variant="h6"
        color="primary"
        sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}
      >
        Categoría: {categoria}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2c4175" }}
          onClick={() => onEdit()}
          disabled={editTipo}
        >
          Editar
          <EditIcon sx={{ color: "white", ml: 2 }} />
        </Button>

        <List sx={{ width: "100%" }}>
          <Grid2 container>
            {listItem.map((value) => (
              <Grid2 sx={{ width: "100%" }} key={value}>
                <ListItem sx={{ border: "blue" }} mb={2}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    disabled={!editTipo}
                    label={value}
                    sx={{ mr: 3 }}
                  />
                  <IconButton>
                    <VisibilityIcon sx={{ color: "#2c4175" }} />
                  </IconButton>
                </ListItem>
              </Grid2>
            ))}

            {nuevosTipos.map((tipo, index) => (
              <Grid2 sx={{ width: "100%" }} key={index}>
                <ListItem sx={{ border: "blue" }} mb={2}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    label="Ingrese un nuevo tipo"
                    value={tipo}
                    onChange={(e) => onTipoChange(index, e.target.value)}
                    sx={{ mr: 3 }}
                  />
                  <IconButton onClick={() => onEliminarTipo(index)}>
                    <DeleteIcon sx={{ color: "red" }} /> {/* Botón para eliminar */}
                  </IconButton>
                </ListItem>
              </Grid2>
            ))}
          </Grid2>
        </List>

        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            onClick={onNuevoTipo}
          >
            Agregar
          </Button>
        </Box>

        <Button
          disabled={!editTipo}
          variant="contained"
          sx={{ backgroundColor: "#2c4175", mr: 2 }}
        >
          Guardar Ediciones
        </Button>
        <Button disabled={!editTipo} variant="contained" color="error">
          Cancelar
        </Button>
      </form>
    </Box>
  );
};
