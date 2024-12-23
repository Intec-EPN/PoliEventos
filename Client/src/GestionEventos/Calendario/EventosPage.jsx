import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Calendario } from "./Calendario";
import { EventoSimple } from "./components/EventoSimple";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEventos } from "../../store/GestionEventos/thunk";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../store/auth/thunks";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EventIcon from "@mui/icons-material/Event";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { LogoutOutlined } from "@mui/icons-material";
import { ModalReporte } from "./components/ModalReporte";

export const EventosPage = () => {
  const [formato, setFormato] = useState(true);
  const [modalReporteIsOpen, setModalReporteIsOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [reportePermiso, setReportePermiso] = useState(false);

  const { eventos } = useSelector((state) => state.gestionEvento);
  const { nivelPropio, permisos } = useSelector((state) => state.adminAuth);

  const { departamentos } = useSelector((state) => state.gestionEvento);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startLoadingEventos());
  }, [dispatch]);

  useEffect(() => {
    if (eventos) {
      const eventosFormateados = eventos.map((evento) => ({
        ...evento,
        start: new Date(evento.start),
        end: new Date(evento.end),
      }));
      setEvents(eventosFormateados);
    }
  }, [eventos]);

  const sortedEvents = events.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const onLogout = async () => {
    try {
      await dispatch(startLogout());
      navigate("/login");
    } catch (error) {
      throw new Error("Error al cerrar sesión", error);
    }
  };

  const handleOpenReporte = () => {
    setModalReporteIsOpen(true);
  };

  useEffect(() => {
    if (permisos) {
      setReportePermiso(
        permisos.some(
          (permiso) => permiso.permisoId === 4 || permiso.permisoId === 8
        )
      );
    }
  }, [permisos]);

  return (
    <Box
      sx={{
        height: "98vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          px: "0.5rem",
          borderBottom: "2px solid green",
          height: "50px",
          color: "green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          zIndex: 1000,
        }}
      >
        {formato ? (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              onClick={() => setFormato(false)}
              sx={{ cursor: "pointer" }}
            >
              Vista
            </Typography>
            <IconButton
              onClick={() => setFormato(false)}
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <FormatListBulletedIcon
                sx={{
                  color: "green",
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              onClick={() => setFormato(true)}
              sx={{ cursor: "pointer" }}
            >
              Vista
            </Typography>
            <IconButton
              onClick={() => setFormato(true)}
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <EventIcon
                sx={{
                  color: "green",
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                }}
              />
            </IconButton>
          </Box>
        )}

        {!nivelPropio && reportePermiso && (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography onClick={handleOpenReporte} sx={{ cursor: "pointer" }}>
              Reporte
            </Typography>
            <IconButton
              onClick={handleOpenReporte}
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <AssessmentOutlinedIcon
                sx={{
                  color: "green",
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                }}
              />
            </IconButton>
          </Box>
        )}

        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography onClick={onLogout} sx={{ cursor: "pointer" }}>
            Salir
          </Typography>
          <IconButton onClick={onLogout} sx={{ p: { xs: 0.5, sm: 1 } }}>
            <LogoutOutlined
              sx={{ color: "green", fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          overflowY: "auto",
          mt: "3.5rem",
        }}
      >
        {formato ? (
          <Calendario />
        ) : (
          <Box
            sx={{ width: "100%", maxHeight: "80vh", paddingBottom: "10rem" }}
          >
            {sortedEvents.map((event, index) => (
              <EventoSimple key={index} event={event} />
            ))}
          </Box>
        )}
      </Box>
      <ModalReporte
        modalIsOpen={modalReporteIsOpen}
        setModalIsOpen={setModalReporteIsOpen}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: 2,
          py: 0.3,
        }}
      >
        {departamentos?.map((dep) => (
          <Box
            sx={{ display: "inline-flex", gap: 0.5, alignItems: "center" }}
            key={dep.id}
          >
            <span
              style={{
                border: "0.5px solid rgba(0, 0, 0, 0.15)",
                backgroundColor:
                  dep.id === 1
                    ? "#4b99d2"
                    : dep.id === 2
                    ? "#a479b1"
                    : dep.id === 3
                    ? "#fbbc04"
                    : "transparent",
                display: "inline-flex",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            ></span>
            <Typography variant="caption" sx={{ color: "#333333" }}>
              {dep.departamento}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
