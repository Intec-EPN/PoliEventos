import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingArchivo,
  startEditingArchivosPorEvento,
  startEditingEvento,
  startUpLoadingArchivos,
} from "../../../store/GestionEventos/thunk";
import { setEventoEdicion } from "../../../store/GestionEventos/gestionEventosSlice";
import { DepartamentoItemInicial } from "./Creacion/DepartamentoItemInicial";
import { ArchivosInicial } from "./Creacion/ArchivosInicial";
import { EnlaceInicial } from "./Creacion/EnlaceInicial";
import { EsquemaCategoriaEditar } from "./Creacion/EsquemaCategoriaEditar";

export const ModalEditar = ({
  modalIsOpen,
  setModalIsOpen,
  event,
  handleEditClose,
}) => {
  const hoy = dayjs();
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [files, setFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [sendFiles, setSendFiles] = useState(false);

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };
  const handleFilesToDeleteChange = (newFiles) => {
    setFilesToDelete(newFiles);
  };

  const methods = useForm({
    defaultValues: {
      esquemasCategorias: event?.data?.esquemaCategoria || [],
      personasCargo: [],
      expositores: [],
      tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
    },
  });

  const [showDepartamento, setShowDepartamento] = useState(false);
  const dispatch = useDispatch();

  const handleReset = (editMode) => {
    setShowDepartamento(editMode);
    setIsReset(true);
  };

  useEffect(() => {
    if (modalIsOpen && event) {
      setLoading(true);
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
        tipoSeleccion: "departamento",
      });
      setIsReset(true);
      setTimeout(() => setLoading(false), 1500);
    } else if (modalIsOpen && !event) {
      setLoading(true);
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
        enlaces: "",
        descripcion: "",
        departamento: [],
        tipoSeleccion: "departamento",
      });
      setIsReset(true);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [modalIsOpen, event, methods]);

  const onSubmit = (data) => {
    setSendFiles(true);
    filesToDelete.forEach(({ fileName: nombreArchivo, eventId: eventoId }) => {
      dispatch(startDeletingArchivo({ nombreArchivo, eventoId }));
    });

    // Validaciones de campos obligatorios
    if (!data.titulo || !data.lugar || !data.descripcion) {
      alert("Debe completar los campos de título, lugar y descripción.");
      return;
    }
    if (data.personasCargo.length === 0) {
      alert("Debe agregar al menos una persona a cargo.");
      return;
    }
    if (
      !showDepartamento &&
      (!data.departamento || data.departamento.length === 0)
    ) {
      data.departamento = event.data?.departamento || [];
    }
    if (data.departamento.length === 0) {
      alert("Debe seleccionar al menos un departamento.");
      return;
    }
    if (!data.esquemasCategorias || data.esquemasCategorias.length === 0) {
      data.esquemasCategorias = event.data?.esquemaCategoria || [];
    }

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

    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

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
        enlaces: data.enlaces,
        descripcion: data.descripcion,
        departamento: data.departamento || [],
        esquemasCategorias: data.esquemasCategorias || [],
        personasCargo: data.personasCargo || [],
        expositores: data.expositores || [],
      })
    );
    dispatch(startEditingEvento(event.id, files));

    if (!files.length > 0) {
      dispatch(
        startEditingArchivosPorEvento({
          eventoId: event.id,
          nuevoDepartamento: data.departamento.join("__"),
        })
      );
    }

    handleEditClose();
    methods.reset();
    setIsReset(false);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setShowDepartamento(false); // Restablecer el estado de showDepartamento
    setIsReset(false); // Restablecer el estado de isReset
    methods.reset({
      esquemasCategorias: event?.data?.esquemaCategoria || [],
      personasCargo: [],
      expositores: [],
      departamento: [],
      tipoSeleccion: "departamento",
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
          position: "relative",
        },
        onSubmit: methods.handleSubmit(onSubmit),
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(3, 3, 59, 0.2)",
            zIndex: 1,
          }}
        >
          <CircularProgress sx={{ color: "#0a3b91" }} />
        </Box>
      )}
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

          <EsquemaCategoriaEditar esquemasCategorias={event?.data?.esquemaCategoria}/>

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

          <DialogContentText sx={{ color: "#333333" }}>
            Archivos
          </DialogContentText>
          <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
            <ArchivosInicial
              eventId={event?.id}
              onFilesChange={handleFilesChange}
              onFilesToDeleteChange={handleFilesToDeleteChange}
            />
            <EnlaceInicial enlace={event?.data} />
          </Box>

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
