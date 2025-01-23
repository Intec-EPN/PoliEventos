import { Box, IconButton, Typography } from "@mui/material";
import { CalendarioGeneral } from "./CalendarioGeneral";
import { useEffect, useState } from "react";
import {
  startLoadingDepartamentos,
  startLoadingEventos,
} from "../store/GestionEventos/thunk";
import { useDispatch, useSelector } from "react-redux";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EventIcon from "@mui/icons-material/Event";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { EventoSimple } from "../GestionEventos/Calendario/components/EventoSimple";

export const EventosGeneralPage = () => {
  const [formato, setFormato] = useState(true);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(startLoadingEventos());
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);
  const { eventos } = useSelector((state) => state.gestionEvento);
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
  const { departamentos } = useSelector((state) => state.gestionEvento);
  const sortedEvents = events
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 10);

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
        }}
      >
        {formato ? (
          <CalendarioGeneral />
        ) : (
          <Box
            sx={{
              width: "100%",
              paddingBottom: "2rem",
            }}
          >
            <Typography
              textAlign={"center"}
              sx={{
                my: 1,
                fontWeight: "500",
                fontSize: "0.9rem",
                color: "#1e3990",
              }}
            >
              Se muestran los 10 eventos más cercanos:
            </Typography>
            {sortedEvents.map((event, index) => (
              <EventoSimple key={index} event={event} />
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 2,
          pt: 0.4,
          pb: 0.9,
          boxShadow: "0px -4px 2px -2px rgba(0, 0, 0, 0.15)",
          ml: -1,
        }}
      >
        <Box display="flex" alignItems="center">
          {formato ? (
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography
                onClick={() => setFormato(false)}
                sx={{ cursor: "pointer", fontSize: "0.9rem", color: "#0a3b91" }}
              >
                Vista
              </Typography>
              <IconButton onClick={() => setFormato(false)}>
                <FormatListBulletedIcon
                  sx={{
                    color: "#0a3b91",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                />
              </IconButton>
            </Box>
          ) : (
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography
                onClick={() => setFormato(true)}
                sx={{ cursor: "pointer", fontSize: "0.9rem", color: "#0a3b91" }}
              >
                Vista
              </Typography>
              <IconButton
                onClick={() => setFormato(true)}
                sx={{ p: { xs: 0.5, sm: 1 } }}
              >
                <EventIcon
                  sx={{
                    color: "#0a3b91",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={{ xs: 0, sm: 2 }}
        >
          <Box sx={{ display: "inline-flex", gap: 0.5, alignItems: "center" }}>
            <span
              style={{
                border: "1.5px solid rgb(0, 0, 0)",
                backgroundColor: "white",
                display: "inline-flex",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            ></span>
            <Typography variant="caption" sx={{ color: "#333333", pt: 0.1 }}>
              FIEE
            </Typography>
          </Box>
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
              <Typography variant="caption" sx={{ color: "#333333", pt: 0.1 }}>
                {dep.departamento}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            onClick={onLogin}
            sx={{ cursor: "pointer", fontSize: "0.9rem", color: "#0a3b91" }}
          >
            Inicia sesión
          </Typography>
          <IconButton onClick={onLogin}>
            <LoginIcon
              sx={{
                color: "#0a3b91",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
