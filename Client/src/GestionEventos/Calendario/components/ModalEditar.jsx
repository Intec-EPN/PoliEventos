import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
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
import { useEffect, useState } from "react";
import { DepartamentoItemInicial } from "./Visualizar/DepartamentoItemInicial";

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
      tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
    },
  });

  const [showDepartamento, setShowDepartamento] = useState(false);

  const handleReset = (editMode) => {
    setShowDepartamento(editMode);
  };

  useEffect(() => {
    if (modalIsOpen && event) {
      console.log("Valores del evento para editar:", event.data);
      methods.reset({
        esquemasCategorias: event.data?.esquemaCategoria || [],
        personasCargo: event.data?.personasACargo || [],
        expositores: event.data?.expositores || [],
        title: event?.title || "",
        lugar: event?.data?.lugar || "",
        startDate: dayjs(event?.start).format("DD/MM/YYYY"),
        startTime: dayjs(event?.start).format("HH:mm"),
        endDate: dayjs(event?.end).format("DD/MM/YYYY"),
        endTime: dayjs(event?.end).format("HH:mm"),
        descripcion: event?.data?.descripcion || "",
        departamento: event?.data?.departamento || [],
        tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
      });
    } else if (modalIsOpen && !event) {
      methods.reset({
        esquemasCategorias: [],
        personasCargo: [],
        expositores: [],
        title: "",
        lugar: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        descripcion: "",
        departamento: [],
        tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
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
      departamento: [],
      tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
    });
  };

  if (!event) {
    return null;
  }

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
          <FechaHora defaultStart={event?.start} defaultEnd={event?.end} />
          <Box display={"flex"} gap={1} alignItems={{ xs: "end", sm: "top" }}>
            <Titulo defaultValue={event?.title} />
            <Lugar defaultValue={event?.data?.lugar} />
          </Box>
          <Descripcion defaultValue={event?.data?.descripcion} />
          <Expositores defaultValues={event?.data?.expositores} />
          <EsquemaCategoria defaultValues={event.data?.esquemaCategoria} />
          <DialogContentText sx={{ color: "#333333" }}>
            Organizadores del evento
          </DialogContentText>
          {showDepartamento ? (
            <>
              <TipoSeleccion />
              <Departamento />
            </>
          ) : (
            <DepartamentoItemInicial
              departamentos={event?.data?.departamento}
              onReset={handleReset}
            />
          )}
          <PersonaCargo defaultValues={event?.data?.personasACargo} />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{color:"red", border:"2px solid red"}}>Cancelar</Button>
        <Button type="submit" variant="contained" sx={{backgroundColor:"#2c4175"}}>Editar evento</Button>
      </DialogActions>
    </Dialog>
  );
};
