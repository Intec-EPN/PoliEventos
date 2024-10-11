import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { CategoriaPermiso } from "../../../Permisos/components/CategoriaPermiso";
import { permisos } from "../../../permisos";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarRol,
  manejarPermiso,
  setDescripcion,
  setRol,
} from "../../../../../store/Administracion/Roles/rolSlice";
import { useEffect } from "react";
import { RadioButton } from "./RadioButton";

const niveles = permisos;

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

  const { creandoRol, seleccionNivel, rolEnCreacion } = useSelector((state) => state.rol);

  useEffect(() => {
    if (!creandoRol) {
      reset({
        nombreRol: "",
        descripcionRol: "",
      });
    }
  }, [creandoRol, reset]);

  const onSubmit = (data) => {
    // TODO quitar console log
    console.log(data); // Muestra los datos ingresados en la consola
    if (rolEnCreacion.departamentos.length < 1) {
      alert("Debes seleccionar un departamento antes de crear el rol.");
      return;
    }
    dispatch(agregarRol()); // Se crea el rol con el rol que se tenga en ese momento.

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
        CREAR UN ROL
      </Typography>
      <Grid2 container gap={3}>
        <Grid2 width="95%">
          <Controller
            name="nombreRol"
            control={control}
            defaultValue=""
            rules={{
              required: "El nombre del rol es obligatorio.",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ingresa el nombre del rol"
                variant="outlined"
                placeholder="Nombre del rol"
                fullWidth={true}
                error={!!errors.nombreRol} // Muestra el error si existe
                helperText={errors.nombreRol ? errors.nombreRol.message : ""}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(setRol(e.target.value));
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 width="95%">
          <Controller
            name="descripcionRol"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Ingresa la descripción del rol"
                placeholder="Descripción del rol"
                multiline
                rows={4}
                variant="outlined"
                fullWidth={true}
                onChange={(e) => {
                  field.onChange(e); // Asegúrate de llamar a field.onChange
                  dispatch(setDescripcion(e.target.value));
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 container display="flex" flexDirection="column">
          <RadioButton />
          <Box
            display="block"
            justifyContent="start"
            sx={{ justifyContent: { xs: "start" } }}
          >
            {/* //Nivel Propio */}
            <Grid2 container sx={{ mt: 2 }}>
              <CategoriaPermiso
                {...niveles.Propio}
                clickable={true}
                align={true}
                onPermisoClick={manejarPermisoClick}
              />
            </Grid2>
            {seleccionNivel === "Departamento" ? (
              //Nivel Departamento
              <Grid2 container display="block">
                <CategoriaPermiso
                  {...niveles.Departamento}
                  clickable={true}
                  dept={true}
                  align={true}
                  onPermisoClick={manejarPermisoClick}
                />
              </Grid2>
            ) : (
              // Nivel Facultad 
              <Grid2 container>
                <CategoriaPermiso
                  {...niveles.Facultad}
                  clickable={true}
                  align={true}
                  onPermisoClick={manejarPermisoClick}
                />
              </Grid2>
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
    </form>
  );
};
