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
import { startEditingAsistentes } from "../../../store/GestionEventos/thunk";

export const ModalAsistentes = ({
  open,
  onClose,
  eventoId,
  asistentesIniciales,
}) => {
  const dispatch = useDispatch();
  const [asistentes, setAsistentes] = useState(null);  
  useEffect(() => {
    if(asistentesIniciales !== null){
      setAsistentes(asistentesIniciales);
    }
  }, [asistentesIniciales]);

  const handleAsistenteChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setAsistentes(value);
    }
  };

  const handleEnviarAsistente = () => {
    dispatch(startEditingAsistentes({ eventoId, asistentes }));
    onClose(asistentes);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {
            asistentesIniciales === null ? "Agregar asistentes" : "Editar asistentes"
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Ingresa el número de asistentes"
          type="number"
          fullWidth
          variant="standard"
          value={asistentes || 0} 
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
            onClick={onClose}
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
