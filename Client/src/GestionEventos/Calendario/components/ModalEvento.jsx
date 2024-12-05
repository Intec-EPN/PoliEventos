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

export const ModalEvento = ({
  modalIsOpen,
  setModalIsOpen,
  handleAddEvent,
}) => {
  const hoy = dayjs();
  const methods = useForm({
    defaultValues: {
      esquemasCategorias: [],
      personasCargo: [],
      expositores: [], 
    },
  });
  const onSubmit = (data) => {
    const startDate = dayjs(`${data.startDate} ${data.startTime}`, "DD/MM/YYYY HH:mm");
    const endDate = dayjs(`${data.endDate} ${data.endTime}`, "DD/MM/YYYY HH:mm");

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
    methods.reset();
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
          <PersonaCargo />
          <Expositores />
          <Descripcion />
          <EsquemaCategoria />
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
