import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingEventos } from "../store/GestionEventos/thunk";
import { Box, Typography } from "@mui/material";
import dayjs from "../dayjsConfig";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CircularProgress from "@mui/material/CircularProgress";
import { ModalInfoEvento } from "../GestionEventos/Calendario/components/ModalInfoEvento";
import "../GestionEventos/Calendario/customCalendar.css";

const localizer = dayjsLocalizer(dayjs);

export const CalendarioGeneral = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(startLoadingEventos());
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
      setTimeout(() => setLoading(false), 2000);
    }
  }, [eventos]);

  const handleOpenEvent = (event) => {
    setSelectedEvent(event);
    setModalEvent(true);
  };
  const handleCloseEvent = () => {
    setModalEvent(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "10rem",
            pt: "23rem",
          }}
        >
          <CircularProgress sx={{ color: "#0a3b91" }} />
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#0a3b91", mt: 2 }}
          >
            Cargando eventos...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            my: "0.5rem",
            width: "100%",
            fontFamily: "Helvetica, Arial,sans-serif",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <>
            <Calendar
              style={{ height: "90vh", width: "90vw" }}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleOpenEvent}
              views={[Views.MONTH, Views.DAY]}
              components={{
                event: CustomEvent,
              }}
              messages={{
                next: (
                  <NavigateNextIcon
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "50%",
                        cursor: "pointer",
                      },
                    }}
                  />
                ),
                previous: (
                  <NavigateBeforeIcon
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "50%",
                        cursor: "pointer",
                      },
                    }}
                  />
                ),
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                agenda: "Agenda",
                date: "Fecha",
                time: "Hora",
                event: "Evento",
                noEventsInRange: "No hay eventos en este rango",
                showMore: (total) => `+ Ver más (${total})`,
              }}
            />
            <ModalInfoEvento
              modalIsOpen={modalEvent}
              setModalIsOpen={handleCloseEvent}
              event={selectedEvent}
            />
          </>
        </Box>
      )}
    </>
  );
};

const CustomEvent = ({ event }) => {
  let dep = event.data.departamento;
  let backgroundColor;

  if (dep.length === 1) {
    backgroundColor =
      dep[0] === 1
        ? "#4b99d2"
        : dep[0] === 2
        ? "#a479b1"
        : dep[0] === 3
        ? "#fbbc04"
        : "white";
  } else if (dep.length === 2) {
    backgroundColor = `linear-gradient(to bottom, ${
      dep[0] === 1
        ? "#4b99d2"
        : dep[0] === 2
        ? "#c05476"
        : dep[0] === 3
        ? "#fbbc04"
        : "white"
    } 50%, ${
      dep[1] === 1
        ? "#4b99d2"
        : dep[1] === 2
        ? "#a479b1"
        : dep[1] === 3
        ? "#fbbc04"
        : "white"
    } 50%)`;
  } else {
    backgroundColor = "white";
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <span
        style={{
          background: backgroundColor,
          display: "inline-flex",
          minWidth: "0.3rem",
          maxWidth: "0.5rem",
          height: "auto",
        }}
      ></span>
      <Box
        sx={{
          width: "auto",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontWeight: "bold",
        }}
      >
        {event.title}
      </Box>
      <Box
        sx={{
          width: "auto",
          maxWidth: "50%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {dayjs(event.start).format("HH:mm")} -{" "}
        {dayjs(event.end).format("HH:mm")}
      </Box>
    </Box>
  );
};
