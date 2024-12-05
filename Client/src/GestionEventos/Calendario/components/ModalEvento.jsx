import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FechaHora } from "./Creacion/FechaHora";
import { EsquemaCategoria } from "./Creacion/EsquemaCategoria";
import { Departamento } from "./Creacion/Departamento";
import { Titulo } from "./Creacion/Titulo";
import { Descripcion } from "./Creacion/Descripcion";
import { Lugar } from "./Creacion/Lugar";
import { PersonaCargo } from "./Creacion/PersonaCargo";
import { Expositores } from "./Creacion/Expositores";
import { TipoSeleccion } from "./Creacion/TipoSeleccion";
import dayjs from "../../../dayjsConfig";
import { useEffect } from "react";

const hoy = dayjs();

export const ModalEvento = ({
  modalIsOpen,
  setModalIsOpen,
  handleAddEvent,
}) => {
  const methods = useForm({
    defaultValues: {
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
      tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
    },
  });

  useEffect(() => {
    if (modalIsOpen) {
      methods.reset({
        esquemasCategorias: [],
        personasCargo: [],
        expositores: [],
        tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
      });
    }
  }, [modalIsOpen, methods]);

  const onSubmit = (data) => {
    const startDate = dayjs(`${data.startDate} ${data.startTime}`, "DD/MM/YYYY HH:mm");
    const endDate = dayjs(`${data.endDate} ${data.endTime}`, "DD/MM/YYYY HH:mm");

    if (startDate.isBefore(hoy) || endDate.isBefore(hoy)) {
      alert("El evento debe ser en el futuro.");
      return;
    }
    // Asegúrate de que los departamentos se envíen correctamente
    data.departamento = data.departamento || [];
    handleAddEvent(data);
    setModalIsOpen(false);
    methods.reset();
  };

  const handleClose = () => {
    setModalIsOpen(false);
    methods.reset({
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
    });
  };

  return (
    <Dialog
      fullWidth
      open={modalIsOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: {
          p: 2,
          width: {
            xs: "90vw",
            md: "70vw",
            lg: "50vw",
          },
          maxWidth: {
            xs: "90vw",
            md: "70vw",
            lg: "50vw",
          },
        },
        onSubmit: methods.handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Agregar nuevo evento</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <Box display={"flex"} gap={1} alignItems={{ xs: "end", sm:"top" }}>
            <Titulo />
            <Lugar />
          </Box>
          <FechaHora />
          <Expositores />
          <PersonaCargo />
          <Descripcion />
          <EsquemaCategoria />
          <TipoSeleccion />
          <Departamento />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit">Crear evento</Button>
      </DialogActions>
    </Dialog>
  );
};
