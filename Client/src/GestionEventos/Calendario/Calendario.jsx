import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { ModalEvento } from "./components/ModalEvento";
import { useEffect, useState } from "react";
import dayjs from "../../dayjsConfig";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  limpiarEventoCreacion,
  setEnd,
  setEventoCreacion,
  setStart,
} from "../../store/GestionEventos/gestionEventosSlice";
import {
  startCreateEvento,
  startLoadingEventos,
} from "../../store/GestionEventos/thunk";
import { ModalInfoEvento } from "./components/ModalInfoEvento";
import "./customCalendar.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const localizer = dayjsLocalizer(dayjs);

export const Calendario = () => {
  const [events, setEvents] = useState([]);

  const { eventos } = useSelector((state) => state.gestionEvento);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch = useDispatch();

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

  const handleSelectSlot = ({ start, end }) => {
    const startDateTime = dayjs(start)
      .hour(8)
      .minute(0)
      .second(0)
      .toISOString();
    const endDateTime = dayjs(start).hour(9).minute(0).second(0).toISOString();
    dispatch(setStart(startDateTime));
    dispatch(setEnd(endDateTime));
    setModalIsOpen(true);
  };

  // Agregar evento.
  const handleAddEvent = (data) => {
    const {
      titulo,
      startDate,
      startTime,
      endDate,
      endTime,
      lugar,
      descripcion,
      departamento,
      esquemasCategorias,
      personasCargo,
      expositores,
    } = data;

    const start = dayjs(
      `${startDate} ${startTime}`,
      "DD/MM/YYYY HH:mm"
    );
    const end = dayjs(
      `${endDate} ${endTime}`,
      "DD/MM/YYYY HH:mm"
    );

    if (!start.isValid() || !end.isValid()) {
      alert("Fecha u hora inválida.");
      return;
    }

    dispatch(
      setEventoCreacion({
        titulo,
        lugar,
        descripcion,
        departamento: departamento || [],
        esquemasCategorias,
        personasCargo,
        expositores,
        start: start.toISOString(),
        end: end.toISOString(),
      })
    );
    dispatch(startCreateEvento());
    dispatch(limpiarEventoCreacion());
    setModalIsOpen(false);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  // Abrir evento
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
      <Box
        sx={{
          mt: "1rem",
          mb: "0.5rem",
          width: "100%",
          fontFamily: "Helvetica, Arial,sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <Calendar
            style={{ height: "87vh", width: "90vw" }}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleOpenEvent}
            views={[Views.MONTH]}
            components={{
              event: CustomEvent, // Aquí especificas el componente personalizado
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
          <ModalEvento
            modalIsOpen={modalIsOpen}
            setModalIsOpen={handleModalClose}
            handleAddEvent={handleAddEvent}
          />
          <ModalInfoEvento
            modalIsOpen={modalEvent}
            setModalIsOpen={handleCloseEvent}
            event={selectedEvent}
          />
        </>
      </Box>
    </>
  );
};

const CustomEvent = ({ event }) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
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
        {event.data.descripcion}
      </Box>
    </Box>
  );
};
