import { Controller } from "react-hook-form";
import {
  ListItem,
  IconButton,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { cambiarVisibilidadCategoria } from "../../../../../store/Administracion/Categorizacion/categorizacionSlice";
import { startChangingCategoryVisible, startDeletingCategory } from "../../../../../store/Administracion/Categorizacion/thunks";

export const TipoItem = ({
  index,
  categoria,
  visible,
  editTipo,
  control,
  errors,
  validateTipo,
}) => {
  const dispatch = useDispatch();
  const { esquemaCategorizacionActual } = useSelector(
    (state) => state.categorizacion
  );

  if (
    !esquemaCategorizacionActual ||
    Object.keys(esquemaCategorizacionActual).length === 0
  ) {
    return <div>Cargando...</div>;
  }

  const categoriaActual = esquemaCategorizacionActual.categorias.find(
    (cat) => cat.id === index
  );

  const onVisibilidadCategoria = () => {
    let idEsquema = esquemaCategorizacionActual.id;
    let idCategoria = categoriaActual.id;
    dispatch(cambiarVisibilidadCategoria({ idEsquema, idCategoria }));
    dispatch(startChangingCategoryVisible());
  };

  // Para borrar la categoría
  const onBorrar = () => {
    let idEsquema = esquemaCategorizacionActual.id;
    let idCategoria = categoriaActual.id;
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar esta categoría?"
    );
    if (confirmacion) {
      dispatch(startDeletingCategory({idCategoria, idEsquema}));
    }
  };

  return (
    <ListItem sx={{ border: "blue" }} mb={2}>
      <FormControl fullWidth error={!!errors.tipos?.[index]}>
        <Controller
          name={`tipos[${index}]`}
          control={control}
          defaultValue={categoria || ""}
          rules={{ 
            validate: validateTipo,
            maxLength: {
              value: 150,
              message: "La descripción no puede tener más de 150 caracteres",
            },
           }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              disabled={!editTipo}
              sx={{ mr: 3 }}
            />
          )}
        />
        {/* Muestra un mensaje de error si existe */}
        {errors.tipos?.[index] && (
          <FormHelperText>{errors.tipos[index].message}</FormHelperText>
        )}
      </FormControl>
      {editTipo && (
        <IconButton onClick={() => onVisibilidadCategoria()}>
          {visible ? (
            <VisibilityIcon sx={{ color: "#2c4175" }} />
          ) : (
            <VisibilityOffIcon sx={{ color: "#2c4175" }} />
          )}
        </IconButton>
      )}
      <IconButton disabled={!editTipo} onClick={() => onBorrar()}>
        <DeleteIcon sx={{ color: `${editTipo ? '#2c4175' : '#90a4ae'}` }} />
      </IconButton>
    </ListItem>
  );
};
