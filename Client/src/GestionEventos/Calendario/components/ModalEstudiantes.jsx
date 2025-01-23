import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startEditingEstudiantes } from "../../../store/GestionEventos/thunk";

export const ModalEstudiantes = ({
  open,
  onClose,
  eventoId,
  estudiantesIniciales,
}) => {
  const dispatch = useDispatch();
  const [estudiantes, setEstudiantes] = useState(null);  
  useEffect(() => {
    if(estudiantesIniciales !== null){
      setEstudiantes(estudiantesIniciales);
    }
  }, [estudiantesIniciales]);

  useEffect(() => {
    if (open) {
      setEstudiantes(estudiantesIniciales);
    }
  }, [open, estudiantesIniciales]);

  const handleAsistenteChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setEstudiantes(value);
    }
  };

  const handleEnviarAsistente = () => {
    dispatch(startEditingEstudiantes({ eventoId, estudiantes: estudiantes || 0 }));
    onClose(estudiantes || 0);
  };

  const handleCloseModal = () => {
    onClose(estudiantesIniciales !== null ? estudiantesIniciales : null);
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>
        {
            estudiantesIniciales === null ? "Agregar estudiantes" : "Editar estudiantes"
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Ingresa el número de estudiantes"
          type="number"
          fullWidth
          variant="standard"
          value={estudiantes || 0} 
          onChange={handleAsistenteChange}
          slotProps={{ htmlInput: { min: 0 } }}
        />
      </DialogContent>
      <DialogActions>
        <Box
          display={"flex"}
          gap={1}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="error"
            sx={{ flex: 1 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEnviarAsistente}
            variant="contained"
            sx={{ backgroundColor: "#2c4175", flex: 1 }}
          >
            Guardar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
