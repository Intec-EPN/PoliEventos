import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Grid2, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import PopUpEditarEsquema from "../PopUpEditarEsquema";

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
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      nuevasCategorias: [{ value: "" }], // Inicializa con un valor vacío
      fields: [{ value: "" }], // Inicializa con un valor vacío
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nuevasCategorias", // Nombre del array en los valores del formulario
  });

  // Verificar si esquemas está vacío y cargarlo si es necesario
  useEffect(() => {
    setAlertOpen(false);
    dispatch(startLoadingEsquemas());
  }, [dispatch]);

  // Obtener las categorías del estado de Redux
  const { esquemas, cancelar } = useSelector((state) => state.categorizacion);

  const [handleAgregarCategoria, setHandleAgregarCategoria] = useState(false);
  const [nuevasCategorias, setNuevasCategorias] = useState([]);

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
    if (value.trim() !== value) {
      // Mensaje de error si comienza o termina con un espacio
      return "La categoría no puede comenzar o terminar con un espacio";
    }
    // Pasa la validación.
    return true;
  };

  // SUBMIT FORMULARIO
  const onSubmit = (data) => {
    const { nombre, descripcion, nuevasCategorias } = data;
    if (!nombre || !descripcion) {
      return;
    }

    // Validar que no haya campos vacíos en nuevasCategorias solo si handleAgregarCategoria es true
    if (handleAgregarCategoria && nuevasCategorias) {
      for (const categoria of nuevasCategorias) {
        if (!categoria.value) {
          return;
        }
      }
    }

    const categoriasExistentesEditadas = categorias.map((cat) => ({
      id: cat.id,
      nombre: data.tipos[cat.id] || cat.tipo,
      visible: cat.visible,
      esquemas_id: id,
    }));

    const categoriasNuevas = nuevasCategorias
      ? nuevasCategorias
          .filter((cat) => cat.value.trim() !== "")
          .map((cat) => ({
            nombre: cat.value,
            visible: true,
            esquemas_id: id,
          }))
      : [];

    // Genero el objeto a enviar
    const categoriaEditadas = [
      ...categoriasExistentesEditadas,
      ...categoriasNuevas,
    ];
    // Alerta
    setAlertOpen(true);
    setEditCategoria(false);
    dispatch(actualizarEsquemaCategoriaActual(categoriaEditadas));
    dispatch(startEditingEsquema(id));
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  // Cancelar (volver)
  const onCancel = () => {
    dispatch(limpiarEsquemaCategorizacionActual());
    navigate(-1);
  };

  // Cancelar agregar categoria
  const onCancelAgregar = () => {
    const nuevasCategoriasValues = getValues("nuevasCategorias");
    nuevasCategoriasValues.forEach((categoria, index) => {
      remove(index);
    });
    setHandleAgregarCategoria(false);
    reset((formValues) => ({
      ...formValues,
      nuevasCategorias: [{ value: "" }], // Reiniciar nuevasCategorias
    }));
  };

  // Validación de existencia de campos y errores.
  const handleAddField = () => {
    const lastFieldValue = getValues(
      `nuevasCategorias.${fields.length - 1}.value`
    );

    // Validar el último campo antes de agregar uno nuevo
    const validationResult = validarCategoria(lastFieldValue);
    if (validationResult !== true) {
      // Si hay un error, configurar el error en el formulario
      setError(`nuevasCategorias.${fields.length - 1}.value`, {
        type: "manual",
        message: validationResult,
      });
      return; // No agregar un nuevo campo si la validación falla
    }

    // Limpiar el error si la validación es exitosa
    clearErrors(`nuevasCategorias.${fields.length - 1}.value`);
    append({ value: "" }); // Agregar un nuevo campo
  };

  // Cerrar PopUp
  const handleClose = () => setAlertOpen(false);

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
      <Divider sx={{ mb: 2 }}>o</Divider>
      <CatTituloDescrip
        control={control}
        errors={errors}
        editTipo={editCategoria}
      />
      {categorias.length == 0 ? (
        <Typography variant="h6" color="#2c4175">
          Presiona el botón para agregar categorías
        </Typography>
      ) : (
        <>
          <Typography variant="h6" color="#2c4175" mb={1}>
            Editar categorías actuales
          </Typography>
          <Indicadores value={"categoría"} />
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <List sx={{ width: "100%" }}>
          <Grid2 container>
            {categorias.map(({ id, nombre, visible, usado }) => (
              <TipoItem
                key={id}
                index={id}
                visible={visible}
                categoria={nombre}
                usado={usado}
                editTipo={editCategoria}
                control={control}
                errors={errors}
                validateTipo={validarCategoria}
                esquema={esquemaActual}
              />
            ))}
          </Grid2>
        </List>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={categorias.length == 0 ? "start" : "end"}
          mt={categorias.length == 0 ? -1 : 0}
          mb={2}
          sx={{ width: "100%" }}
        >
          {!handleAgregarCategoria && (
            <Button
              variant="contained"
              onClick={() => setHandleAgregarCategoria(true)}
              sx={{ width: { xs: "100%", md: "15%" }}}
            >
              Agregar Categoría
            </Button>
          )}
        </Box>
        {handleAgregarCategoria && (
          <AgregarCategorias
            fields={fields}
            remove={remove}
            control={control}
            errors={errors}
            handleAddField={handleAddField}
            onCancelAgregar={onCancelAgregar}
            editCategoria={false} // Asegúrate de que los campos no estén deshabilitados
            getValues={getValues}
            setError={setError}
            clearErrors={clearErrors}
            disableFields={!editCategoria} // Deshabilitar campos cuando se guarda
          />
        )}

        <Box display="flex">
          <Button
            disabled={
              !isDirty &&
              !handleAgregarCategoria &&
              Object.keys(dirtyFields).length === 0
            }
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
      <PopUpEditarEsquema open={alertOpen} handleClose={handleClose} />
    </Box>
  );
};
