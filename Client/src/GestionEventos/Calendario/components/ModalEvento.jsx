import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
      tipoSeleccion: "departamento", 
    },
  });

  useEffect(() => {
    if (modalIsOpen) {
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
    }
  }, [modalIsOpen, methods]);

  const onSubmit = (data) => {
    console.log("CREAR", data);

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

    const startDateISO = startDate.format("YYYY-MM-DDTHH:mm:ss");
    const endDateISO = endDate.format("YYYY-MM-DDTHH:mm:ss");

    data.departamento = data.departamento || [];
    handleAddEvent({
      ...data,
      start: startDateISO,
      end: endDateISO,
    });
    setModalIsOpen(false);
    methods.reset();
  };

  const handleClose = () => {
    setModalIsOpen(false);
    methods.reset({
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [],
      tipoSeleccion: "departamento", // Inicializa el valor de tipoSeleccion
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
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
          <EsquemaCategoria isFromModalEvento={true} />
          <DialogContentText sx={{ color: "#333333" }}>
            Organizadores del evento
          </DialogContentText>
          <TipoSeleccion />
          <Departamento />
          <PersonaCargo />
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