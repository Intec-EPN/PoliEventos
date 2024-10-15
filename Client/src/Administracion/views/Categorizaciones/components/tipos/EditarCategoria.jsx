import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid2, List, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { cambiarViewDeTipo } from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { AlertCorrecto } from "./AlertCorrecto";
import { TipoItem } from "./TipoItem";
import { NuevoTipoItem } from "./NuevoTipoItem";
import { CatTituloDescrip } from "./CatTituloDescrip";

export const EditarCategoria = () => {
  // Generar dispatch para llamar a funciones usando REDUX
  const dispatch = useDispatch();

  // Obtener la categoría desde los params
  const { esquemaActual } = useSelector((state) => state.categorizacion);

  // Obtengo el useNavigate para volver en caso de cancelar
  const navigate = useNavigate();
  if (esquemaActual === "") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h6" color="error" mb={2}>
          No fue posible cargar la página.
        </Typography>
        <Button
          onClick={() => navigate("/admin/categorizaciones")}
          variant="contained"
        >
          Volver
        </Button>
      </Box>
    );
  }

  // Obtener las categorías del estado de Redux
  const { esquemas } = useSelector((state) => state.categorizacion);

  // Obtengo la descripción
  const { descripcion } = esquemas.find((x) => x.nombre === esquemaActual);
  // Obtengo las categorias
  const categorias = esquemas.find(
    (x) => x.nombre === esquemaActual
  ).categorias;
  console.log(categorias);
  // Uso del formulario a través de react form hook
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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


  // Editar tipo (para habilitar o deshabilitar botones cuando se edita), si se pulsa editar, ya NO se puede volver, ya que podría generar un error, la solución será salir con cancelar.
  const [editTipo, setEditTipo] = useState(false);
  const onEdit = () => {
    setEditTipo(true);
    setAlertOpen(false);
  };

  // Arreglo para nuevos tipos (Con esto puedo agregar los que necesite)
  const [nuevosTipos, setNuevosTipos] = useState([]);
  const onNuevoTipo = () => {
    // Añade un nuevo campo vacío al arreglo (es para contabilizarm, nada más, ya que luego se usa un map).
    setNuevosTipos([...nuevosTipos, ""]);
  };

  // Eliminar los Agregar momentaneos
  const onEliminarTipo = (index) => {
    // Elimina el tipo en la posición correspondiente
    const updatedTipos = nuevosTipos.filter((_, i) => i !== index);
    setNuevosTipos(updatedTipos);
  };

  // REDUX
  // Para dejar de ver
  const onViewClick = (categoria, tipo) => {
    dispatch(cambiarViewDeTipo({ categoria, tipo }));
  };

  // Para alerta del success:
  const [alertOpen, setAlertOpen] = useState(false);
  // SUBMIT FORMULARIO
  const onSubmit = (data) => {
    const tiposEditados = categorias.map((t, index) => ({
      tipo: data.tipos[index] || t.tipo,
      view: t.view,
    }));

    // Asegúrate de que 'nuevosTipos' obtenga los valores del formulario
    const nuevosTiposData = data.nuevosTipos || [];

    // TODO quitar console.log
    console.log(tiposEditados.concat(nuevosTiposData));
    // Genero el objeto a enviar
    const categoriaEditadas = {
      Nombre: esquemaActual,
      Tipos: [
        ...tiposEditados,
        ...nuevosTiposData.map((nuevo) => ({ tipo: nuevo, view: true })),
      ],
      view: true,
    };

    // Alerta
    setAlertOpen(true);
    setEditTipo(false);

    //Generar dispatch, por ej:
    // dispatch(actualizarCategorias(categoriasEditadas)); // Usa la acción adecuada para actualizar tu estad
  };

  // Cancelar (volver)
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Box ml={3} mr={3}>
      <CatTituloDescrip
        categoriaActual={esquemaActual}
        descripcion={descripcion}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          sx={{ mr: 1, backgroundColor: "#e3320e" }}
          variant="contained"
          onClick={() => onCancel()}
        >
          <ArrowBackIosIcon sx={{ width: "15px" }} />
          Retroceder
        </Button>
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
            {categorias.map(
              ({ id, nombre, visible }) =>
                visible && (
                  <TipoItem
                    key={id}
                    index={id}
                    tipo={nombre}
                    editTipo={editTipo}
                    control={control}
                    errors={errors}
                    validateTipo={validateTipo}
                    onViewClick={onViewClick}
                  />
                )
            )}
            {nuevosTipos.map((categoria, index) => (
              <NuevoTipoItem
                key={index}
                index={index}
                tipo={categoria}
                editTipo={editTipo}
                control={control}
                errors={errors}
                validateTipo={validateTipo}
                onEliminarTipo={onEliminarTipo}
              />
            ))}
          </Grid2>
        </List>

        <Box display="flex" justifyContent="end">
          <Button
            disabled={!editTipo}
            variant="contained"
            sx={{ backgroundColor: "#2c4175", mb: 2, mr: 2 }}
            onClick={handleSubmit(onNuevoTipo)}
          >
            Agregar
          </Button>
        </Box>

        {alertOpen ? <AlertCorrecto openT={alertOpen} /> : null}

        <Button
          disabled={!editTipo}
          variant="contained"
          sx={{ backgroundColor: "#2c4175", mr: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          Guardar
        </Button>
        <Button
          disabled={!editTipo}
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
