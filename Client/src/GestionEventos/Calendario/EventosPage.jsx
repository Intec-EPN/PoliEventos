import { Box, IconButton } from "@mui/material";
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

  const { eventos } = useSelector((state) => state.gestionEvento);
  const { nivelPropio } = useSelector((state) => state.adminAuth);

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

  const onLogout = async () => {
    try {
      await dispatch(startLogout());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleOpenReporte = () => {
    setModalReporteIsOpen(true);
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "row",
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
          <IconButton
            onClick={() => setFormato(false)}
            sx={{ p: { xs: 0.5, sm: 1 } }}
          >
            <FormatListBulletedIcon
              sx={{ color: "green", fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setFormato(true)}
            sx={{ p: { xs: 0.5, sm: 1 } }}
          >
            <EventIcon
              sx={{ color: "green", fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
          </IconButton>
        )}

        {!nivelPropio && (
          <IconButton
            onClick={handleOpenReporte}
            sx={{ p: { xs: 0.5, sm: 1 } }}
          >
            <AssessmentOutlinedIcon
              sx={{ color: "green", fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
          </IconButton>
        )}

        <IconButton onClick={onLogout} sx={{ p: { xs: 0.5, sm: 1 } }}>
          <LogoutOutlined
            sx={{ color: "green", fontSize: { xs: "1rem", sm: "1.5rem" } }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "calc(100% - 50px)", // Ajustar la altura para el header
          top: "50px", // Ajustar la posición para el header
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
          opacity: formato ? 1 : 0,
          visibility: formato ? "visible" : "hidden",
        }}
      >
        <Calendario />
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "calc(100% - 50px)", // Ajustar la altura para el header
          top: "50px", // Ajustar la posición para el header
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
          opacity: formato ? 0 : 1,
          visibility: formato ? "hidden" : "visible",
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", mt: 4, maxHeight: "90vh" }}>
          {events.map((event, index) => (
            <EventoSimple key={index} event={event} />
          ))}
        </Box>
      </Box>
      <ModalReporte
        modalIsOpen={modalReporteIsOpen}
        setModalIsOpen={setModalReporteIsOpen}
      />
    </Box>
  );
};
