import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
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
import { useEffect, useState } from "react";
import { TabArchivos } from "./Creacion/TabArchivos";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingDepartamentos } from "../../../store/GestionEventos/thunk";

// Inicializa la fecha de hoy usando dayjs
const hoy = dayjs();

export const ModalEvento = ({
  modalIsOpen,
  setModalIsOpen,
  handleAddEvent,
  events,
}) => {
  // Configura el formulario con valores por defecto
  const methods = useForm({
    defaultValues: {
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
      tipoSeleccion: "departamento",
    },
  });

  const dispatch = useDispatch();
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [sendFiles, setSendFiles] = useState(false);

  // Carga los departamentos al montar el componente
  useEffect(() => {
    dispatch(startLoadingDepartamentos());
    // Selecciona los tres departamentos por defecto
    methods.setValue("departamento", [1, 2, 3]);
  }, [dispatch, methods]);

  const { departamentos, eventoCreacion } = useSelector(
    (state) => state.gestionEvento
  );
  const { nivelFacultad, nivelDepartamento, departamentoNivelId, nivelPropio } =
    useSelector((state) => state.adminAuth);
  const { start, end } = useSelector(
    (state) => state.gestionEvento.eventoCreacion
  );

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  // Resetea el formulario y establece valores por defecto cuando se abre el modal
  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true); // Iniciar carga
      methods.reset({
        esquemasCategorias: [],
        personasCargo: [],
        expositores: [],
        tipoSeleccion: "departamento",
        startDate: dayjs().format("DD/MM/YYYY"),
        startTime: "08:00",
        endDate: dayjs().format("DD/MM/YYYY"),
        endTime: "09:00",
      });
      setIsReset(true);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [modalIsOpen, methods]);

  // Establece el departamento por defecto si el usuario tiene nivel de departamento
  useEffect(() => {
    if (nivelDepartamento && departamentoNivelId) {
      methods.setValue("departamento", [departamentoNivelId]);
    }
  }, [nivelDepartamento, departamentoNivelId, methods]);

  const onSubmit = (data) => {
    setSendFiles(true);

    // Asegura que data.departamento sea un array
    data.departamento = data.departamento || [departamentoNivelId];

    // Establece valores por defecto si no se selecciona nada
    if (!data.startTime || data.startTime === "hh:mm") {
      data.startTime = "08:00";
    }
    if (!data.endTime || data.endTime === "hh:mm") {
      data.endTime = "09:00";
    }
    if (!data.startDate || data.startDate === "DD/MM/YYYY") {
      data.startDate = dayjs(start).format("DD/MM/YYYY");
    }
    if (!data.endDate || data.endDate === "DD/MM/YYYY") {
      data.endDate = dayjs(end).format("DD/MM/YYYY");
    }

    // Validaciones de campos obligatorios
    if (!data.titulo || !data.lugar || !data.descripcion) {
      alert("Debe completar los campos de título, lugar y descripción.");
      return;
    }

    if (!data.esquemasCategorias) {
      alert("Comple la categoría.");
      return;
    }

    if (data.esquemasCategorias.some((esquema) => esquema.esquemaId === "")) {
      alert("Debe seleccionar al menos un esquema.");
      return;
    }
    if (data.esquemasCategorias.some((esquema) => esquema.categoriaId === "")) {
      alert("Cada esquema debe tener su categoría.");
      return;
    }

    if (data.departamento.length === 0) {
      alert("Debe seleccionar al menos un departamento.");
      return;
    }
    if (data.personasCargo.length === 0) {
      alert("Debe agregar al menos una persona a cargo.");
      return;
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

    if (startDate.isBefore(hoy) || endDate.isBefore(hoy)) {
      alert("El evento debe ser en el futuro.");
      return;
    }

    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

    // Verifica si la fecha y hora coinciden con algún otro evento
    const isOverlapping = events.some(
      (event) =>
        startDate.isSame(event.start, "day") &&
        endDate.isSame(event.end, "day") &&
        (startDate.isBetween(event.start, event.end, null, "[)") ||
          endDate.isBetween(event.start, event.end, null, "(]") ||
          startDate.isSame(event.start) ||
          endDate.isSame(event.end))
    );

    if (isOverlapping) {
      if (
        !window.confirm(
          "La hora coincide con otro evento. ¿Está seguro de que desea continuar?"
        )
      ) {
        return;
      }
    }

    handleAddEvent({
      ...data,
      start: startDateISO,
      end: endDateISO,
      files: files,
    });
    setModalIsOpen(false);
    methods.reset();
    setIsReset(false);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    methods.reset({
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
      tipoSeleccion: "departamento",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      enlaces: "",
    });
    setIsReset(false);
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
          <CircularProgress />
        </Box>
      )}
      <DialogTitle sx={{ textAlign: "center" }}>
        Agregar nuevo evento
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <FechaHora />
          <Box display={"flex"} gap={1} alignItems={{ xs: "end", sm: "top" }}>
            <Titulo />
            <Lugar />
          </Box>
          <Descripcion />
          <Expositores />
          <EsquemaCategoria isFromModalEvento={true} isReset={isReset} />
          <DialogContentText sx={{ color: "#333333" }}>
            Organizadores del evento
          </DialogContentText>
          {nivelFacultad && <Departamento />}

          {((nivelPropio && nivelDepartamento) ||
            (nivelPropio && !nivelFacultad)) &&
            departamentoNivelId && (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "500",
                  color: "#164dc9",
                  fontSize: "1.1rem",
                  mt: 0.5,
                }}
              >
                {departamentos
                  ? ` ${
                      departamentos.find(
                        (dep) => dep.id === departamentoNivelId
                      )?.departamento
                    }`
                  : "Departamento no encontrado"}
              </Typography>
            )}
          <PersonaCargo />
          <TabArchivos
            sendFiles={sendFiles}
            onFilesChange={handleFilesChange}
          />
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
          Crear evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};
