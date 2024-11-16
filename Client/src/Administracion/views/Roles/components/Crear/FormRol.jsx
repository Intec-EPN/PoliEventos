import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { CategoriaPermiso } from "../../../Permisos/components/CategoriaPermiso";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  manejarPermiso,
  reiniciarRol,
  setDescripcion,
  setRol,
} from "../../../../../store/Administracion/Roles/rolSlice";
import { useEffect, useState } from "react";
import { RadioButton } from "./RadioButton";
import { startCreatingRoles } from "../../../../../store/Administracion/Roles/thunks";
import { useNavigate } from "react-router-dom";
import PopUpCrear from "./PopUpCrear";

export const FormRol = () => {
  // Hook Form
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // Hook para guardar en el creando rol actual la información:
  const dispatch = useDispatch();
  // Hook para navegar
  const navigate = useNavigate();

  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { creandoRol, seleccionNivel, rolEnCreacion } = useSelector(
    (state) => state.rol
  );

  // Traigo los permisos como array para convertirlos a objeto.
  const { permisosAcciones } = useSelector((state) => state.permiso);

  // Convertir array de niveles en un objeto con las claves "Propio", "Departamento", "Facultad"
  const niveles = permisosAcciones.reduce((acc, nivel) => {
    acc[nivel.nombre] = nivel;
    return acc;
  }, {});

  useEffect(() => {
    if (!creandoRol) {
      reset({
        nombreRol: "",
        descripcionRol: "",
      });
    }
  }, [creandoRol, reset]);

  const onSubmit = async () => {
    if (rolEnCreacion.departamentos.length < 1) {
      alert("Debes seleccionar un departamento antes de crear el rol.");
      return;
    }
    if (
      rolEnCreacion.permisos.every((permiso) => permiso.acciones.length === 0)
    ) {
      alert("Debes seleccionar al menos una permiso antes de crear el rol.");
      return;
    }
    const success = await dispatch(startCreatingRoles(rolEnCreacion));
    if (success) {
      dispatch(reiniciarRol());
      handleOpen(); // Abrir el modal al crear el rol exitosamente
      setTimeout(() => {
        navigate("/admin/roles/lista");
      }, 2000);
    }
  };

  const manejarPermisoClick = (nivel, permisoId) => {
    dispatch(manejarPermiso({ nivel, permisoId }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        noWrap
        color="primary"
        sx={{ fontWeight: 700, mb: 1 }}
      >
        Completa los campos para crear un nuevo rol:
      </Typography>
      <Grid2 container gap={3}>
        <RadioButton reset={reset} />
        <Grid2 width="95%">
          <Controller
            name="nombreRol"
            control={control}
            defaultValue=""
            rules={{
              required: "El nombre del rol es obligatorio.",
              maxLength: {
                value: 30,
                message:
                  "El nombre del rol no puede exceder los 30 caracteres.",
              },
              validate: {
                noLeadingTrailingSpaces: (value) =>
                  value.trim() === value ||
                  "El nombre del rol no debe comenzar o terminar con espacios.",
                  notAdmn: (value) =>
                    value.toLowerCase() !== "admn" ||
                    'Nombre de rol no permitido, ingrese otro.',
              },
            }}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Ingresa el nombre del rol"
                  variant="outlined"
                  placeholder="Nombre del rol"
                  fullWidth={true}
                  error={!!errors.nombreRol} // Muestra el error si existe
                  helperText={errors.nombreRol ? errors.nombreRol.message : ""}
                  maxLength={30}
                  onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      field.onChange(e);
                      dispatch(setRol(e.target.value));
                    }
                  }}
                />
                <Typography variant="caption" color="textSecondary">
                  Máximo 30 caracteres.
                </Typography>
              </div>
            )}
          />
        </Grid2>
        <Grid2 width="95%">
          <Controller
            name="descripcionRol"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 150,
                message:
                  "La descripción del rol no puede exceder los 255 caracteres.",
              },
            }}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Ingresa la descripción del rol"
                  placeholder="Descripción del rol"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth={true}
                  error={!!errors.descripcionRol} // Muestra el error si existe
                  helperText={
                    errors.descripcionRol ? errors.descripcionRol.message : ""
                  }
                  maxLength={150}
                  onChange={(e) => {
                    if (e.target.value.length <= 150) {
                      field.onChange(e); // Llama a field.onChange solo si está dentro del límite
                      dispatch(setDescripcion(e.target.value));
                    }
                  }}
                />
                <Typography variant="caption" color="textSecondary">
                  Máximo 150 caracteres.
                </Typography>
              </div>
            )}
          />
        </Grid2>
        <Box display="flex" width="100%">
          <Typography sx={{ fontWeight: 700, color: "primary" }}>
            Selecciona los permisos:
          </Typography>
        </Box>

        <Grid2 container display="flex" flexDirection="column">
          <Box
            display="block"
            justifyContent="start"
            sx={{ justifyContent: { xs: "start" } }}
          >
            {/* //Nivel Propio */}
            <Grid2 container>
              <CategoriaPermiso
                {...niveles.Propio}
                clickable={true}
                align={true}
                onPermisoClick={manejarPermisoClick}
                nivelSeleccionado={seleccionNivel} // Pasar la nueva prop
              />
            </Grid2>
            {seleccionNivel === "Departamento" && niveles.Departamento ? (
              // Nivel Departamento
              <Grid2 container display="block">
                <CategoriaPermiso
                  {...niveles.Departamento}
                  clickable={true}
                  dept={true}
                  align={true}
                  onPermisoClick={manejarPermisoClick}
                  nivelSeleccionado={seleccionNivel} // Pasar la nueva prop
                />
              </Grid2>
            ) : niveles.Facultad ? (
              // Nivel Facultad
              <Grid2 container>
                <CategoriaPermiso
                  {...niveles.Facultad}
                  clickable={true}
                  align={true}
                  onPermisoClick={manejarPermisoClick}
                  nivelSeleccionado={seleccionNivel} // Pasar la nueva prop
                />
              </Grid2>
            ) : (
              // Manejo de casos donde no hay niveles definidos
              <Typography color="error">
                No hay permisos disponibles.
              </Typography>
            )}
          </Box>
        </Grid2>
      </Grid2>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1e2c4f", mt: 2, mb: 2 }}
        type="submit"
      >
        CREAR ROL
      </Button>
      <PopUpCrear open={open} handleClose={handleClose} />
    </form>
  );
};
