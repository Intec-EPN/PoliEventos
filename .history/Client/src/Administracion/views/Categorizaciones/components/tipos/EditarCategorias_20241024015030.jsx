import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid2, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCorrecto } from "./AlertCorrecto";
import { TipoItem } from "./TipoItem";
import { NuevaCategoria } from "./NuevaCategoria";
import { CatTituloDescrip } from "./CatTituloDescrip";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  actualizarEsquemaCategoriaActual,
  agregarCategoria,
  limpiarEsquemaCategorizacionActual,
  setEsquemaCategorizacionActual,
} from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import {
  startEditingEsquema,
  startLoadingEsquemas,
} from "../../../../../store/Administracion/Categorizacion/thunks";
import { Indicadores } from "./Indicadores";

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
      nuevosTipos: [""], // Inicializa con un valor vacío
    },
  });

  // Verificar si esquemas está vacío y cargarlo si es necesario
  useEffect(() => {
    setAlertOpen(false);
    dispatch(startLoadingEsquemas());
  }, [dispatch]);

  // Obtener las categorías del estado de Redux
  const { esquemas, cancelar, categoriasActuales } = useSelector(
    (state) => state.categorizacion
  );
  const [nuevasCategorias, setNuevasCategorias] = useState(categoriasActuales);

  useEffect(() => {
    setNuevasCategorias(categoriasActuales);
  }, [categoriasActuales]);

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

  
  // Para agregar nuevas categorias:
  const onNuevaCategoria = (data) => {
    // Verifica si el array está vacío
    if (nuevasCategorias.length === 0) {
      console.log("El array está vacío. Se permite el ingreso.");
    } else {
      // Verifica el último elemento del array
      const lastCategory = nuevasCategorias[nuevasCategorias.length - 1];
      if (!lastCategory.nombre?.trim()) {
        console.log("El último elemento está vacío. No se permite el ingreso.");
        return; // No permite el ingreso si el último elemento está vacío
      }
    }

    // Agregar una nueva categoría usando el valor del campo de texto
    const nuevaCategoria = {
      nombre: data.nuevosTipos[0] || "", // Se toma el primer valor del array
      visible: true,
    };

    console.log("nueva categoria:", nuevaCategoria);
    console.log("categorias: ", nuevasCategorias);

    // Despachar la acción para agregar la nueva categoría
    dispatch(agregarCategoria(nuevaCategoria));
    setNuevasCategorias([...nuevasCategorias, nuevaCategoria]);
  };

  // Errores para el formulario:
  const validateTipo = (value) => {
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

    // REFACTORIZAR
    const categoriasEditados = categorias.map((cat) => ({
      id: cat.id,
      nombre: data.tipos[cat.id] || cat.tipo,
      visible: cat.visible,
      esquemas_id: id,
    }));

    // Genero el objeto a enviar
    const categoriaEditadas = [
      ...categoriasEditados,
      // TODO obtener las nuevas categorais pues
      // ...nuevasCategorias.map((nuevo) => ({
      //   nombre: nuevo,
      //   visible: true,
      //   esquemas_id: id,
      // })),
    ];

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
        Categorías
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
                validateTipo={validateTipo}
                esquema={esquemaActual}
              />
            ))}
            {/* //TODO! */}
            {nuevasCategorias.map((categoria, index) => (
              <NuevaCategoria
                key={index}
                index={index}
                categoria={categoria.nombre}
                editTipo={editCategoria}
                control={control}
                errors={errors}
                validateTipo={validateTipo}
                // onEliminarTipo={onEliminarCategoria}
              />
            ))}
          </Grid2>
        </List>

        <Box display="flex" justifyContent="end">
          <Button
            disabled={!editCategoria}
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            onClick={() => handleSubmit(onNuevaCategoria)()}
          >
            Agregar
          </Button>
        </Box>

        {alertOpen ? <AlertCorrecto openT={alertOpen} /> : null}

        <Button
          disabled={!editCategoria}
          variant="contained"
          sx={{ backgroundColor: "#2c4175", mr: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          Guardar
        </Button>
        <Button
          disabled={!editCategoria}
          variant="contained"
          sx={{ backgroundColor: "#e3320e" }}
          onClick={() => onCancel()}
        >
          Cancelar
        </Button>
      </form>
    </Box>
  );
};
