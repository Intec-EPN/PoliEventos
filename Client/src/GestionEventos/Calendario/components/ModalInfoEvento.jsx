import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { FechaVer } from "./Visualizar/FechaVer";
import dayjs from "../../../dayjsConfig";
import { LugarVer } from "./Visualizar/LugarVer";
import { DescripcionVer } from "./Visualizar/DescripcionVer";
import { ExpositoresVer } from "./Visualizar/ExpositoresVer";
import { PersonasVer } from "./Visualizar/PersonasVer";
import { DepartamentoVer } from "./Visualizar/DepartamentoVer";
import { HoraVer } from "./Visualizar/HoraVer";
import { ModalEditar } from "./ModalEditar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { startDeletingEvento } from "../../../store/GestionEventos/thunk";


export const ModalInfoEvento = ({ modalIsOpen, setModalIsOpen, event }) => {
  const hoy = dayjs();
  
  const { start, end, title, data, usuarioId } = event || {};
  const {
    asistentes,
    departamento,
    descripcion,
    esquemaCategoria,
    expositores,
    lugar,
    personasACargo,
  } = data || {};

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(startDeletingEvento(event.id));
    handleClose();
  };

  const handleEditClose = () => {
    setEditModalIsOpen(false);
    setModalIsOpen(false);
  };

  const { user, permisos, departamento: userDepartamento } = useSelector(
    (state) => state.adminAuth
  );

 
  const permisoEditPropio = usuarioId === user.id && (permisos || []).some(permiso => permiso.permisoId === 1);
  const permisoDeletePropio = usuarioId === user.id && (permisos || []).some(permiso => permiso.permisoId === 1);
  const permisoEditDepartamento = (permisos || []).some(permiso => permiso.permisoId === 2);
  const permisoDeleteDepartamento = (permisos || []).some(permiso => permiso.permisoId === 3);
  const permisoEditFacultad = (permisos || []).some(permiso => permiso.permisoId === 6);
  const permisoDeleteFacultad = (permisos || []).some(permiso => permiso.permisoId === 7);

  const permisoEditEvento = permisoEditPropio || permisoEditFacultad || (permisoEditDepartamento && departamento ? departamento.includes(userDepartamento) : false);
  const permisoDeleteEvento = permisoDeletePropio || permisoDeleteFacultad || (permisoDeleteDepartamento && departamento ? departamento.includes(userDepartamento) : false);  

  if (!event) {
    return null;
  }

  return (
    <Dialog
      fullWidth
      open={modalIsOpen}
      onClose={handleClose}
      PaperProps={{
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
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <DialogContent>
        <Box
          display={{ xs: "block", lg: "flex" }}
          gap={3}
          justifyContent={"space-between"}
          width={"98%"}
          mb={2}
        >
          <FechaVer start={start} end={end} />
          <HoraVer start={start} end={end} />
          <LugarVer lugar={lugar} />
        </Box>
        <DescripcionVer descripcion={descripcion} />
        {expositores?.length > 0 && (
          <ExpositoresVer
            expositores={expositores}
            defaultValues={expositores}
          />
        )}
        {personasACargo?.length > 0 && (
          <PersonasVer
            personas={personasACargo}
            defaultValues={personasACargo}
          />
        )}
        {departamento?.length > 0 && (
          <DepartamentoVer departamentos={departamento} />
        )}
      </DialogContent>
      <DialogActions>
        {/* Editar dependiendo del rol */}
        {permisoEditEvento && (
          <ModalEditar
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            event={event}
            handleAddEvent={() => {}}
            handleEditClose={handleEditClose}
          />
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ color: "red", border: "2px solid red" }}
          >
            Cerrar
          </Button>
          {permisoDeleteEvento && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
          )}
          {permisoEditEvento && (
            <Button
              onClick={() => setEditModalIsOpen(true)}
              variant="contained"
              sx={{ backgroundColor: "#2c4175" }}
            >
              Editar
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
