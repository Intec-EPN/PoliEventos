import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarVisibilidadEsquema,
  setEsquemaActual,
  setNuevoEsquemaCategorizacionActual,
} from "../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { useState } from "react";
import { FormularNuevoEsquema } from "./tipos/FormularNuevoEsquema";
import { startChangingVisible } from "../../../../store/Administracion/Categorizacion/thunks";

export const ListaCategorias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { esquemas } = useSelector((state) => state.categorizacion) || {
    esquemas: [],
  };

  // Lógica para editar un esquema.
  const onEdit = (value) => {
    navigate(`/admin/categorizaciones/${value}/editar`);
    dispatch(setEsquemaActual(value));
  };

  // Lógica para cambiar la visibilidad de un esquema (al usuario).
  const onChangeVisibility = (value) => {
    console.log(value);
    dispatch(cambiarVisibilidadEsquema(value));
    dispatch(startChangingVisible());
  };

  // Lógica para crear nuevos esquemas:
  const [nuevoEsquema, setNuevoEsquema] = useState({
    nombre: "",
    descripcion: "",
  });
  const [agregando, setAgregando] = useState(false);

  const handleAgregarClick = () => {
    setAgregando(true);
  };
  const handleGuardarClick = () => {
    if (nuevoEsquema.nombre.trim() && nuevoEsquema.descripcion) {
      const nombre = nuevoEsquema.nombre;
      navigate(`/admin/categorizaciones/${nombre}/crear`);
      dispatch(setEsquemaActual(nombre));

      const esquemaActual = {
        nombre: nuevoEsquema.nombre,
        descripcion: nuevoEsquema.descripcion,
        visible: true,
        categorias: [],
      };

      dispatch(setNuevoEsquemaCategorizacionActual(esquemaActual));

      setNuevoEsquema({
        nombre: "",
        descripcion: "",
      });
      setAgregando(false);
    }
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "white" }}>
        {esquemas &&
          esquemas.map((esquema) =>
            esquema ? (
              <ListItem
                sx={{ bgcolor: "#2c4175", mb: 2 }}
                key={esquema.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => onEdit(esquema.nombre)}>
                      <EditIcon sx={{ color: "white" }} />
                    </IconButton>

                    {esquema.visible ? (
                      <IconButton
                        onClick={() => onChangeVisibility(esquema.nombre)}
                      >
                        <VisibilityIcon sx={{ color: "white" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => onChangeVisibility(esquema.nombre)}
                      >
                        <VisibilityOffIcon sx={{ color: "white" }} />
                      </IconButton>
                    )}
                  </>
                }
              >
                <Tooltip title={esquema.descripcion}>
                  <ListItemText
                    primary={esquema.nombre}
                    sx={{ color: "white" }}
                  />
                </Tooltip>
              </ListItem>
            ) : null
          )}
      </List>

      {agregando && (
        <FormularNuevoEsquema
          nuevoEsquema={nuevoEsquema}
          setNuevoEsquema={setNuevoEsquema}
          onGuardar={handleGuardarClick}
        />
      )}

      {!agregando && (
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2 }}
            onClick={handleAgregarClick}
          >
            Agregar
          </Button>
        </Box>
      )}
    </Box>
  );
};
