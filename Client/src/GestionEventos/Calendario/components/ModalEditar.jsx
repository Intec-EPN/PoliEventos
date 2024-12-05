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
import dayjs from "../../../dayjsConfig";
import { useEffect } from "react";

export const ModalEditar = ({
  modalIsOpen,
  setModalIsOpen,
  handleAddEvent,
  event,
}) => {
  const hoy = dayjs();
  const methods = useForm({
    defaultValues: {
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
    },
  });

  useEffect(() => {
    if (modalIsOpen && event) {
      methods.reset({
        esquemasCategorias: event.data?.esquemaCategoria || [],
        personasCargo: event.data?.personasACargo || [],
        expositores: event.data?.expositores || [],
      });
    }
  }, [modalIsOpen, event, methods]);

  const onSubmit = (data) => {
    const startDate = dayjs(
      `${data.startDate} ${data.startTime}`,
      "DD/MM/YYYY HH:mm"
    );
    const endDate = dayjs(
      `${data.endDate} ${data.endTime}`,
      "DD/MM/YYYY HH:mm"
    );

    if (startDate.isBefore(hoy) || endDate.isBefore(hoy)) {
      alert("El evento debe ser en el futuro.");
      return;
    }
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
      <DialogTitle>Editar evento</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <Box display={"flex"} gap={1} alignItems={{ xs: "end", sm: "top" }}>
            <Titulo defaultValue={event?.title} />
            <Lugar defaultValue={event?.data?.lugar} />
          </Box>
          <FechaHora defaultStart={event?.start} defaultEnd={event?.end} />
          <PersonaCargo defaultValues={event?.data?.personasACargo} />
          <Expositores defaultValues={event?.data?.expositores} />
          <Descripcion defaultValue={event?.data?.descripcion} />
          <EsquemaCategoria defaultValues={event?.data?.esquemaCategoria} />
          <Departamento defaultValues={event?.data?.departamento} />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{color:"red", border:"2px solid red"}}>Cancelar</Button>
        <Button type="submit" variant="contained" sx={{backgroundColor:"#2c4175"}}>Editar evento</Button>
      </DialogActions>
    </Dialog>
  );
};
