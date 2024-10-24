import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid2,
  List,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCorrecto } from "./AlertCorrecto";
import { TipoItem } from "./TipoItem";
import { CatTituloDescrip } from "./CatTituloDescrip";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  actualizarEsquemaCategoriaActual,
  limpiarEsquemaCategorizacionActual,
  setEsquemaCategorizacionActual,
} from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import {
  startEditingEsquema,
  startLoadingEsquemas,
} from "../../../../../store/Administracion/Categorizacion/thunks";
import { Indicadores } from "./Indicadores";
import { AgregarCategorias } from "./AgregarCategorias";

export const EditarCategorias = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Obtengo el esquema
  const { esquemaActual } = useParams();

  // Uso del formulario a través de react form hook
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nuevasCategorias: [""], // Inicializa con un valor vacío
    },
  });

  // Verificar si esquemas está vacío y cargarlo si es necesario
  useEffect(() => {
    setAlertOpen(false);
    dispatch(startLoadingEsquemas());
  }, [dispatch]);

  // Obtener las categorías del estado de Redux
  const { esquemas, cancelar } = useSelector((state) => state.categorizacion);

  const [handleAgregarCategoria, setHandleAgregarCategoria] = useState(false);

  useEffect(() => {
    if (cancelar) {
      navigate(-1);
    }
  }, [cancelar]);

  useEffect(() => {
    dispatch(setEsquemaCategorizacionActual(esquemaActual));
  }, [dispatch]);

  // Obtengo la descripción
  const { id, descripcion } = esquemas.find((x) => x.nombre === esquemaActual);
  useEffect(() => {
    reset({
      nombre: esquemaActual,
      descripcion: descripcion,
    });
  }, [esquemaActual, esquemas, reset]);

  // Obtengo las categorias
  const categorias = esquemas.find(
    (x) => x.nombre === esquemaActual
  ).categorias;

  // Editar categoria (para habilitar o deshabilitar botones cuando se edita), si se pulsa editar, ya NO se puede volver, ya que podría generar un error, la solución será salir con cancelar.
  const [editCategoria, setEditCategoria] = useState(true);
  // Para alerta del success:
  const [alertOpen, setAlertOpen] = useState(false);

  // Errores para el formulario:
  const validarCategoria = (value) => {
    if (!value) {
      // Devuelve un mensaje de error si está vacío
      return "Este campo es obligatorio";
    }
    const regex = /^[A-Za-z0-9\s.,;:'"()?!&%$@/-áéíóúñÁÉÍÓÚÑ]+$/;
    if (!regex.test(value)) {
      // Mensaje de error si no coincide con el regex
      return "Solo se permiten letras, números y puntuación";
    }
    // Pasa la validación.
    return true;
  };

  // SUBMIT FORMULARIO
  const onSubmit = (data) => {
    const { nombre, descripcion } = data;
    if (!nombre || !descripcion) {
      console.log("Hay errores en los campos del hijo");
      return;
    }

    // TODO REFACORIZAR
    const categoriasExistentesEditadas = categorias.map((cat) => ({
      id: cat.id,
      nombre: data.tipos[cat.id] || cat.tipo,
      visible: cat.visible,
      esquemas_id: id,
    }));

    // Genero el objeto a enviar
    const categoriaEditadas = [...categoriasExistentesEditadas];

    // Alerta
    setAlertOpen(true);
    setEditCategoria(false);

    dispatch(actualizarEsquemaCategoriaActual(categoriaEditadas));
    dispatch(startEditingEsquema(id));
  };

  // Cancelar (volver)
  const onCancel = () => {
    dispatch(limpiarEsquemaCategorizacionActual());
    navigate(-1);
  };

  // Cancelar agregar categoria
  const onCancelAgregar = () => {
    setHandleAgregarCategoria(!handleAgregarCategoria);
  };

  return (
    <Box ml={3} mr={3}>
      <Button
        sx={{ mr: 1, mb: 2, mt: 2, backgroundColor: "#e3320e" }}
        variant="contained"
        onClick={() => onCancel()}
      >
        <ArrowBackIosIcon sx={{ width: "15px" }} />
        Retroceder
      </Button>

      <CatTituloDescrip
        control={control}
        errors={errors}
        editTipo={editCategoria}
      />

      <Typography variant="h6" color="#2c4175" mb={1}>
        Editar categorías actuales
      </Typography>
      <Indicadores value={"una categoría"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <List sx={{ width: "100%" }}>
          <Grid2 container>
            {categorias.map(({ id, nombre, visible }) => (
              <TipoItem
                key={id}
                index={id}
                visible={visible}
                categoria={nombre}
                editTipo={editCategoria}
                control={control}
                errors={errors}
                validateTipo={validarCategoria}
                esquema={esquemaActual}
              />
            ))}
          </Grid2>
        </List>

        {alertOpen ? <AlertCorrecto openT={alertOpen} /> : null}

        <Box display="flex">
          <Button
            disabled={!editCategoria}
            variant="contained"
            sx={{
              backgroundColor: "#2c4175",
              mr: 2,
              width: { xs: "100%", md: "10%" },
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </Button>
          <Button
            disabled={!editCategoria}
            variant="contained"
            sx={{
              backgroundColor: "#e3320e",
              width: { xs: "100%", md: "10%" },
            }}
            onClick={() => onCancel()}
          >
            Cancelar
          </Button>
        </Box>
      </form>
      <Divider>o</Divider>
      <Box display="flex" alignItems="center" mt={3}>
        <Checkbox
          checked={handleAgregarCategoria}
          onChange={() => setHandleAgregarCategoria(!handleAgregarCategoria)}
        />
        <Typography variant="h6" color="#2c4175">
          Agregar categorías
        </Typography>
      </Box>
      {handleAgregarCategoria && (
        <AgregarCategorias
          validarCategoria={validarCategoria}
          idEsquemaActual={id}
          onCancelAgregar={onCancelAgregar}
        />
      )}
    </Box>
  );
};
