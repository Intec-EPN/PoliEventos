import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import {
  startDeletingEvento,
  startLoadingArchivosPorIds,
} from "../../../store/GestionEventos/thunk";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const ModalInfoEvento = ({ modalIsOpen, setModalIsOpen, event }) => {
  const hoy = dayjs();
  const dispatch = useDispatch();

  const { id, start, end, title, data, usuarioId } = event || {};

  const { departamento, descripcion, expositores, lugar, personasACargo } =
    data || {};

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const handleDelete = () => {
    dispatch(startDeletingEvento(event.id));
    handleClose();
  };

  const handleEditClose = () => {
    setEditModalIsOpen(false);
    setModalIsOpen(false);
  };

  const handleDownloadFiles = () => {
    dispatch(startLoadingArchivosPorIds([event.id]));
  };

  const {
    user,
    permisos,
    nivelPropio,
    nivelDepartamento,
    nivelFacultad,
    departamentoNivelId,
  } = useSelector((state) => state.adminAuth);

  let permisoEditEvento = false;
  let permisoDeleteEvento = false;

  if (nivelPropio) {
    permisoEditEvento =
      usuarioId === user.id &&
      (permisos || []).some((permiso) => permiso.permisoId === 1);
    permisoDeleteEvento =
      usuarioId === user.id &&
      (permisos || []).some((permiso) => permiso.permisoId === 1);
  } else if (nivelDepartamento) {
    permisoEditEvento =
      (permisos || []).some((permiso) => permiso.permisoId === 2) &&
      (departamento || []).includes(departamentoNivelId);
    permisoDeleteEvento =
      (permisos || []).some((permiso) => permiso.permisoId === 3) &&
      (departamento || []).includes(departamentoNivelId);
  } else if (nivelFacultad) {
    permisoEditEvento = (permisos || []).some(
      (permiso) => permiso.permisoId === 6
    );
    permisoDeleteEvento = (permisos || []).some(
      (permiso) => permiso.permisoId === 7
    );
  }

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

        {permisoEditEvento && (
          <Box>
            {event?.data?.enlaces && (
              <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
                <a
                  href={event.data.enlaces}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    backgroundColor: "#0f5add",
                    borderRadius: '5px',
                    height: "100%",
                  }}
                >
                  <ArrowOutwardIcon
                    sx={{ fontSize: "1rem", color: "white", pl: 2, py: 1.3 }}
                  />
                  <Typography
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#0f5add",
                      ml: 0.5,
                      fontSize: "0.95rem",
                      pl: 0.7,
                      pr:3,
                    }}
                  >
                    {event.data.enlaces}
                  </Typography>
                </a>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                sx={{ backgroundColor: "#2c4175" }}
                onClick={handleDownloadFiles}
              >
                Descargar Archivos
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {/* Editar dependiendo del rol */}
        {permisoEditEvento && (
          <ModalEditar
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            event={event}
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
