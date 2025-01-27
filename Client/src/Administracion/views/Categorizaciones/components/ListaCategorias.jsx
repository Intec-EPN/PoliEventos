import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarVisibilidadEsquema,
  setCancelar,
  setEsquemaActual,
  setEsquemaCategorizacionActual,
  setNuevoEsquemaCategorizacionActual,
} from "../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { useEffect, useState } from "react";
import { FormularNuevoEsquema } from "./tipos/FormularNuevoEsquema";
import {
  startChangingVisible,
  startCreatingEsquema,
  startDeletingEsquema,
} from "../../../../store/Administracion/Categorizacion/thunks";
import PopUpEliminar from "../../../components/PopUpEliminar";

export const ListaCategorias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { esquemas, cancelar, esquemaCategorizacionActual } = useSelector(
    (state) => state.categorizacion
  ) || {
    esquemas: [],
  };

  useEffect(() => {
    if (cancelar) {
      dispatch(setCancelar(false));
    }
  }, [cancelar]);

  // Lógica para cambiar la visibilidad de un esquema (al usuario).
  const onChangeVisibility = (value) => {
    dispatch(cambiarVisibilidadEsquema(value));
    dispatch(startChangingVisible());
  };

  // Lógica para crear nuevos esquemas:
  const [nuevoEsquema, setNuevoEsquema] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    dispatch(setNuevoEsquemaCategorizacionActual(nuevoEsquema));
  }, [nuevoEsquema]);

  const [agregando, setAgregando] = useState(false);

  const handleAgregarClick = () => {
    setNuevoEsquema({
      nombre: "",
      descripcion: "",
    });
    setAgregando(true);
  };
  const handleGuardarClick = (data, setError) => {
    const esquemaRepetido = esquemas.find((esq) => esq.nombre === data.nombre);
    if (esquemaRepetido) {
      setError("nombre", {
        type: "manual",
        message: "El nombre del esquema ya existe.",
      });
      return;
    }
    if (nuevoEsquema.nombre.trim() && nuevoEsquema.descripcion) {
      const nombre = nuevoEsquema.nombre;
      // navigate(`/admin/categorizaciones/${nombre}/crear`);
      dispatch(startCreatingEsquema());
      dispatch(setEsquemaActual(nombre));

      const esquemaCategorizacionActual = {
        nombre: nuevoEsquema.nombre,
        descripcion: nuevoEsquema.descripcion,
        visible: true,
        categorias: [],
      };

      dispatch(
        setNuevoEsquemaCategorizacionActual(esquemaCategorizacionActual)
      );

      setNuevoEsquema({
        nombre: "",
        descripcion: "",
      });
      setAgregando(false);
    }
  };

  // Lógica para cancelar creación de esquema:
  const handleCancelarClick = () => {
    setNuevoEsquema({
      nombre: "",
      descripcion: "",
    });
    setAgregando(false);
  };

  const [openPopup, setOpenPopup] = useState(false);

  // Lógica para obrrar un esquema:
  const onBorrar = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar esta categorización?"
    );
    if (confirmacion) {
      dispatch(startDeletingEsquema(id));
      setOpenPopup(true);
      setTimeout(() => setOpenPopup(false), 2500);
    }
  };

  // Lógica para editar un esquema.
  const onEdit = (nombre, descripcion) => {
    navigate(`/admin/categorizaciones/${nombre}/editar`);
    const esquemaActual = {
      nombre: nombre,
      descripcion: descripcion,
    };

    dispatch(setNuevoEsquemaCategorizacionActual(esquemaActual));
    dispatch(setEsquemaActual(nombre));
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "white" }}>
        {esquemas &&
          esquemas.map((esquema) =>
            esquema ? (
              <ListItem
                sx={{
                  bgcolor:
                    esquema.categorias.length === 0 ? "#dc8626" : "#2c4175",
                  mb: 2,
                  height: { xs: "7rem", md: "5rem" },
                }}
                key={esquema.id}
                secondaryAction={
                  <Box
                    display={"flex"}
                    width={{ xs: 200, md: 300 }}
                    alignItems={"center"}
                  >
                    <IconButton
                      onClick={() =>
                        onEdit(esquema.nombre, esquema.descripcion)
                      }
                      sx={{ flex: 1 }}
                    >
                      <EditIcon sx={{ color: "white" }} />
                    </IconButton>

                    <Box sx={{ flex: 1 }}>
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
                    </Box>

                    <Box
                      sx={{ flex: 3 }}
                      display="flex"
                      justifyContent="center"
                    >
                      {!esquema.usado && (
                        <IconButton onClick={() => onBorrar(esquema.id)}>
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      )}
                      {esquema.usado && (
                        <Typography color="white" textAlign={"center"}>
                          No se puede eliminar (está siendo utilizado).
                        </Typography>
                      )}
                    </Box>
                  </Box>
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
          onCancel={handleCancelarClick}
        />
      )}

      {!agregando && (
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", mb: 2 }}
            onClick={handleAgregarClick}
          >
            Agregar
          </Button>
        </Box>
      )}

      <PopUpEliminar
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        component="Esquema de categorización"
      />
    </Box>
  );
};
