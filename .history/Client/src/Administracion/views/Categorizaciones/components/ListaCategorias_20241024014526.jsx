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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarVisibilidadEsquema,
  eliminarEsquema,
  setCancelar,
  setEsquemaActual,
  setNuevoEsquemaCategorizacionActual,
} from "../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { useEffect, useState } from "react";
import { FormularNuevoEsquema } from "./tipos/FormularNuevoEsquema";
import {
  startChangingVisible,
  startDeletingEsquema,
} from "../../../../store/Administracion/Categorizacion/thunks";
import { Indicadores } from "./tipos/Indicadores";

export const ListaCategorias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { esquemas, cancelar } = useSelector(
    (state) => state.categorizacion
  ) || {
    esquemas: [],
  };

  useEffect(() => {
    if (cancelar) {
      dispatch(setCancelar(false));
    }
  }, [cancelar]);

  // Lógica para editar un esquema.
  const onEdit = (value) => {
    navigate(`/admin/categorizaciones/${value}/editar`);
    dispatch(setEsquemaActual(value));
  };

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
  const [agregando, setAgregando] = useState(false);

  const handleAgregarClick = () => {
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
      navigate(`/admin/categorizaciones/${nombre}/crear`);
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
    setAgregando(false);
  };

  // Lógica para obrrar un esquema:
  const onBorrar = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar esta categorización?"
    );
    if (confirmacion) {
      dispatch(startDeletingEsquema(id));
    }
  };

  return (
    <Box>
      <Indicadores value={"una categorización"} editar={true}/>
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

                    <IconButton onClick={() => onBorrar(esquema.id)}>
                      <DeleteIcon sx={{ color: "white" }} />
                    </IconButton>
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
          onCancel={handleCancelarClick}
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
