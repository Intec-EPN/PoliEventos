import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { TabArchivos } from "./Creacion/TabArchivos";
import { useDispatch } from "react-redux";

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
      tipoSeleccion: "departamento", 
    },
  });

  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [files, setFiles] = useState([]);
  const [sendFiles, setSendFiles] = useState(false);

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true); // Iniciar carga
      methods.reset({
        esquemasCategorias: [],
        personasCargo: [],
        expositores: [],
        tipoSeleccion: "departamento", 
        startDate: dayjs().format("DD/MM/YYYY"),
        startTime: dayjs().hour(8).minute(0).format("HH:mm"),
        endDate: dayjs().format("DD/MM/YYYY"),
        endTime: dayjs().hour(9).minute(0).format("HH:mm"),
      });
      setIsReset(true);
      setTimeout(() => setLoading(false), 1500); 
    }
  }, [modalIsOpen, methods]);

  const onSubmit = (data) => {
    setSendFiles(true);
    console.log("Datos del formulario antes de la validación:", data);

    // Validaciones de campos obligatorios
    if (!data.titulo || !data.lugar || !data.descripcion) {
      alert("Debe completar los campos de título, lugar y descripción.");
      return;
    }
    if (data.personasCargo.length === 0) {
      alert("Debe agregar al menos una persona a cargo.");
      return;
    }
    if (data.departamento.length === 0) {
      alert("Debe seleccionar al menos un departamento.");
      return;
    }
    if (data.esquemasCategorias.length === 0) {
      alert("Debe seleccionar al menos una categoría.");
      return;
    }

    const startDate = dayjs(
      `${data.startDate || dayjs().format("DD/MM/YYYY")} ${data.startTime || dayjs().hour(8).minute(0).format("HH:mm")}`,
      "DD/MM/YYYY HH:mm"
    );
    const endDate = dayjs(
      `${data.endDate || dayjs().format("DD/MM/YYYY")} ${data.endTime || dayjs().hour(9).minute(0).format("HH:mm")}`,
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

    data.departamento = data.departamento || [];

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
          position: "relative", // Añadir posición relativa
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
          <TipoSeleccion />
          <Departamento />
          <PersonaCargo />
          <TabArchivos sendFiles={sendFiles} onFilesChange={handleFilesChange} />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{color:"red", border:"2px solid red"}}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" sx={{backgroundColor:"#2c4175"}}>
          Crear evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};
