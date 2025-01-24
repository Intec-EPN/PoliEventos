import {
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingEvento,
  startLoadingArchivosPorIds,
} from "../../../store/GestionEventos/thunk";
import { ModalAsistentes } from "./ModalAsistentes";
import { ModalEstudiantes } from "./ModalEstudiantes";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HailIcon from "@mui/icons-material/Hail";
import Snackbar from "@mui/material/Snackbar";

export const ModalInfoEvento = ({ modalIsOpen, setModalIsOpen, event }) => {
  const hoy = dayjs();
  const dispatch = useDispatch();

  const { id, start, end, title, data, usuarioId, creador } = event || {};
  const {
    departamento,
    descripcion,
    expositores,
    lugar,
    personasACargo,
    asistentes,
    estudiantes,
    createdAt,
  } = data || {};

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addAsistentesModalIsOpen, setAddAsistentesModalIsOpen] =
    useState(false);

  const [asistentesActualizados, setAsistentesActualizados] = useState(null);
  useEffect(() => {
    setAsistentesActualizados(asistentes);
  }, [asistentes]);

  const [addEstudiantesModalIsOpen, setAddEstudiantesModalIsOpen] =
    useState(false);

  const [estudiantesActualizados, setEstudiantesActualizados] = useState(null);
  useEffect(() => {
    setEstudiantesActualizados(estudiantes);
  }, [estudiantes]);

  const handleDelete = () => {
    dispatch(startDeletingEvento(event.id));
    handleClose();
    setShowDeleteSuccessSnackbar(true);
    setTimeout(() => setShowDeleteSuccessSnackbar(false), 3000);
  };

  const [showEditSuccessSnackbar, setShowEditSuccessSnackbar] = useState(false);
  const [showDeleteSuccessSnackbar, setShowDeleteSuccessSnackbar] =
    useState(false);

  const handleEditClose = () => {
    setEditModalIsOpen(false);
    setShowEditSuccessSnackbar(true);
    setTimeout(() => setShowEditSuccessSnackbar(false), 3000);
    setModalIsOpen(false);
  };

  const handleDownloadFiles = () => {
    dispatch(startLoadingArchivosPorIds([event.id]));
  };

  const handleAddAsistentes = () => {
    setAddAsistentesModalIsOpen(true);
  };

  const handleAddAsistentesClose = (asistentes) => {
    setAddAsistentesModalIsOpen(false);
    if (asistentes !== undefined) {
      setAsistentesActualizados(asistentes);
    }
  };

  const handleAddEstudiantes = () => {
    setAddEstudiantesModalIsOpen(true);
  };

  const handleAddEstudiantesClose = (estudiantes) => {
    setAddEstudiantesModalIsOpen(false);
    if (estudiantes !== undefined) {
      setEstudiantesActualizados(estudiantes);
    }
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
  let permisoDescargaArchivos = false;

  let permisoEditEventoTemp = false;
  let permisoDeleteEventoTemp = false;
  let permisoDescargaArchivosTemp = false;


  // if (nivelDepartamento) {
  //   permisoEditEventoTemp =
  //     (permisos || []).some((permiso) => permiso.permisoId === 2) &&
  //     (departamento || []).includes(departamentoNivelId);
  //   permisoDeleteEventoTemp =
  //     (permisos || []).some((permiso) => permiso.permisoId === 3) &&
  //     (departamento || []).includes(departamentoNivelId);
  //   permisoDescargaArchivosTemp =
  //     (permisos || []).some((permiso) => permiso.permisoId === 5) &&
  //     (departamento || []).includes(departamentoNivelId);
  // }


  // Excluyente:
  if (nivelDepartamento && departamento) {
    permisoEditEventoTemp =
      (permisos || []).some((permiso) => permiso.permisoId === 2) &&
      (departamento.length == 1) && (departamento[0] == departamentoNivelId);
    permisoDeleteEventoTemp =
      (permisos || []).some((permiso) => permiso.permisoId === 3) &&
      (departamento.length == 1) && (departamento[0] == departamentoNivelId);
    permisoDescargaArchivosTemp =
      (permisos || []).some((permiso) => permiso.permisoId === 5) &&
      (departamento.length == 1) && (departamento[0] == departamentoNivelId);
  }

  if (nivelFacultad) {
    permisoEditEventoTemp =
      permisoEditEventoTemp ||
      (permisos || []).some((permiso) => permiso.permisoId === 6);
    permisoDeleteEventoTemp =
      permisoDeleteEventoTemp ||
      (permisos || []).some((permiso) => permiso.permisoId === 7);
    permisoDescargaArchivosTemp =
      permisoDescargaArchivosTemp ||
      (permisos || []).some((permiso) => permiso.permisoId === 9);
  }

  if (nivelPropio) {
    permisoEditEventoTemp =
      permisoEditEventoTemp ||
      (usuarioId === user.id &&
        (permisos || []).some((permiso) => permiso.permisoId === 1));
    permisoDeleteEventoTemp =
      permisoDeleteEventoTemp ||
      (usuarioId === user.id &&
        (permisos || []).some((permiso) => permiso.permisoId === 1));
    permisoDescargaArchivosTemp =
      permisoDescargaArchivosTemp ||
      (usuarioId === user.id &&
        (permisos || []).some((permiso) => permiso.permisoId === 1));
  }

  permisoEditEvento = permisoEditEventoTemp;
  permisoDeleteEvento = permisoDeleteEventoTemp;
  permisoDescargaArchivos = permisoDescargaArchivosTemp;


  return (
    <>
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
            display={{ xs: "block", sm: "flex" }}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            {user && (
              <Box
                width={{ xs: "100%", sm: "50%" }}
                display={{ xs: "flex", sm: "none" }}
                flexDirection={"column"}
                alignItems={{ xs: "center", sm: "flex-end" }}
                mb={2}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "500",
                    color: "#697585",
                    textAlign: { xs: "center", sm: "end" },
                  }}
                >
                  Creado por: {creador}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "500",
                    color: "#697585",
                    textAlign: { xs: "center", sm: "end" },
                  }}
                >
                  Fecha de creación:{" "}
                  {createdAt !== null
                    ? dayjs(createdAt).format("DD/MM/YYYY, hh:mm a")
                    : "Sin fecha."}
                </Typography>
              </Box>
            )}
            <Box
              display={{ xs: "block" }}
              gap={3}
              justifyContent={"space-between"}
              width={{ xs: "100%", sm: "50%" }}
              mb={2}
            >
              <FechaVer start={start} end={end} />
              <HoraVer start={start} end={end} />
              <LugarVer lugar={lugar} />
            </Box>
            {user && (
              <Box
                width={"50%"}
                display={{ xs: "none", sm: "flex" }}
                flexDirection={"column"}
                alignItems={"flex-end"}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "500", color: "#697585", textAlign: "end" }}
                >
                  Creado por: {creador}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "500", color: "#697585", textAlign: "end" }}
                >
                  Fecha de creación:{" "}
                  {createdAt !== null
                    ? dayjs(createdAt).format("DD/MM/YYYY, hh:mm a")
                    : "Sin fecha."}
                </Typography>
              </Box>
            )}
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
          {(permisoEditEvento ||
            permisoDescargaArchivos) && (
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                color: "#164dc9",
                fontSize: "1.2rem",
                mt: 2,
                mb: 1,
              }}
            >
              Acciones:
            </Typography>
          )}

          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={2}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            {permisoDescargaArchivos && event?.data?.enlaces && (
              <Box sx={{ display: "flex", justifyContent: "start" }}>
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
                    borderRadius: "5px",
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
                      pr: 3,
                    }}
                  >
                    {event.data.enlaces}
                  </Typography>
                </a>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "row",
              }}
            >
              {permisoDescargaArchivos && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  sx={{ backgroundColor: "#2c4175" }}
                  onClick={handleDownloadFiles}
                >
                  Descargar Archivos
                </Button>
              )}
            </Box>
            {permisoEditEvento && (
              <>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EmojiPeopleIcon />}
                    sx={{
                      backgroundColor:
                        asistentesActualizados === null ||
                        asistentesActualizados === 0
                          ? "#d8872d"
                          : "#2c4175",
                    }}
                    onClick={handleAddAsistentes}
                  >
                    {asistentesActualizados === null ||
                    asistentesActualizados === 0
                      ? "Agregar beneficiarios"
                      : "Editar beneficiarios: " + asistentesActualizados}
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<HailIcon />}
                    sx={{
                      backgroundColor:
                        estudiantesActualizados === null ||
                        estudiantesActualizados === 0
                          ? "#d8872d"
                          : "#2c4175",
                    }}
                    onClick={handleAddEstudiantes}
                  >
                    {estudiantesActualizados === null ||
                    estudiantesActualizados === 0
                      ? "Agregar estudiantes"
                      : "Editar estudiantes: " + estudiantesActualizados}
                  </Button>
                </Box>
              </>
            )}
          </Box>
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
          {/* Asistentes dependiendo del rol */}
          {permisoEditEvento && (
            <ModalAsistentes
              open={addAsistentesModalIsOpen}
              onClose={handleAddAsistentesClose}
              eventoId={id}
              handleEditClose={handleEditClose}
              asistentesIniciales={asistentesActualizados}
            />
          )}
          {permisoEditEvento && (
            <ModalEstudiantes
              open={addEstudiantesModalIsOpen}
              onClose={handleAddEstudiantesClose}
              eventoId={id}
              handleEditClose={handleEditClose}
              estudiantesIniciales={estudiantesActualizados}
            />
          )}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
                Editar Detalles de evento
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showEditSuccessSnackbar}
        onClose={() => setShowEditSuccessSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowEditSuccessSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Evento editado exitosamente.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showDeleteSuccessSnackbar}
        onClose={() => setShowDeleteSuccessSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowDeleteSuccessSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Evento eliminado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
};
