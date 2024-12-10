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
import { useDispatch } from "react-redux";
import { startEditingEvento } from "../../../store/GestionEventos/thunk";
import { setEventoEdicion } from "../../../store/GestionEventos/gestionEventosSlice";
import { DepartamentoItemInicial } from "./Creacion/DepartamentoItemInicial";

export const ModalEditar = ({
  modalIsOpen,
  setModalIsOpen,
  handleAddEvent,
  event,
  handleEditClose,
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
  const dispatch = useDispatch();

  const handleReset = (editMode) => {
    setShowDepartamento(editMode);
  };

  useEffect(() => {
    if (modalIsOpen && event) {
      methods.reset({
        esquemasCategorias: event.data?.esquemaCategoria || [],
        personasCargo: event.data?.personasACargo || [],
        expositores: event.data?.expositores || [],
        title: event?.title || "",
        lugar: event?.data?.lugar || "",
        startDate: event?.start ? dayjs(event.start).format("DD/MM/YYYY") : "",
        startTime: event?.start ? dayjs(event.start).format("HH:mm") : "",
        endDate: event?.end ? dayjs(event.end).format("DD/MM/YYYY") : "",
        endTime: event?.end ? dayjs(event.end).format("HH:mm") : "",
        descripcion: event?.data?.descripcion || "",
        departamento: event.data?.departamento || [],
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
    // Agregar lógica para enviar valores al formulario
    if (!showDepartamento && event) {
      methods.setValue("departamento", event.data?.departamento || []);
      methods.setValue("esquemasCategorias", event.data?.esquemaCategoria || []);
    }
  }, [modalIsOpen, event, methods, showDepartamento]);

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);

    const startDate = dayjs(
      `${data.startDate} ${data.startTime}`,
      "DD/MM/YYYY HH:mm"
    );
    const endDate = dayjs(
      `${data.endDate} ${data.endTime}`,
      "DD/MM/YYYY HH:mm"
    );
    if (!startDate.isValid() || !endDate.isValid()) {
      alert("Fecha u hora inválida.");
      return;
    }

    const startDateISO = startDate.format("YYYY-MM-DDTHH:mm:ss");
    const endDateISO = endDate.format("YYYY-MM-DDTHH:mm:ss");

    if (dayjs(startDateISO).isBefore(hoy) || dayjs(endDateISO).isBefore(hoy)) {
      alert("El evento debe ser en el futuro.");
      return;
    }
    dispatch(
      setEventoEdicion({
        titulo: data.titulo,
        start: startDateISO,
        end: endDateISO,
        lugar: data.lugar,
        descripcion: data.descripcion,
        departamento: data.departamento || [],
        esquemasCategorias: data.esquemasCategorias || [],
        personasCargo: data.personasCargo || [],
        expositores: data.expositores || [],
      })
    );
    dispatch(startEditingEvento(event.id));
    handleEditClose();
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
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
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
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ color: "red", border: "2px solid red" }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#2c4175" }}
        >
          Editar evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};
