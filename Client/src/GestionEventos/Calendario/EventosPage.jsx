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

export const EventosPage = () => {
  const [formato, setFormato] = useState(true);

  const [events, setEvents] = useState([]);

  const { eventos } = useSelector((state) => state.gestionEvento);
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
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // Añadir posición relativa
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
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
          height: "100%",
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
          opacity: formato ? 0 : 1,
          visibility: formato ? "hidden" : "visible",
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", mt: 7, maxHeight: "90vh" }}>
          {events.map((event, index) => (
            <EventoSimple key={index} event={event} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "green",
          position: "fixed",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          px: "0.5rem",
          borderRadius: "1rem",
          width: "1%",
          height: "25%",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          zIndex: 1000,
          mr:"1.4rem" 
        }}
      >
        {formato ? (
          <IconButton onClick={() => setFormato(false)}>
            <FormatListBulletedIcon sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => setFormato(true)}>
            <EventIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <IconButton onClick={onLogout}>
          <AssessmentOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={onLogout}>
          <LogoutOutlined sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
