import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FechaHora } from "./FechaHora";
import { EsquemaCategoria } from "./EsquemaCategoria";
import { Departamento } from "./Departamento";
import { Titulo } from "./Titulo";
import { Descripcion } from "./Descripcion";
import { Lugar } from "./Lugar";
import { PersonaCargo } from "./PersonaCargo";
import dayjs from "../../../dayjsConfig";
import { Expositores } from "./Expositores";

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
    const startDate = dayjs(data.startDate);
    const endDate = dayjs(data.endDate);

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
