import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { ModalEvento } from "./components/ModalEvento";
import { useEffect, useState } from "react";
import dayjs from "../../dayjsConfig";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
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
    ).toISOString();
    const end = dayjs(
      `${endDate} ${endTime}`,
      "DD/MM/YYYY HH:mm"
    ).toISOString();
    dispatch(
      setEventoCreacion({
        titulo,
        lugar,
        descripcion,
        departamento,
        esquemasCategorias,
        personasCargo,
        expositores,
        start,
        end,
      })
    );
    dispatch(startCreateEvento());
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
    <Box
      sx={{
        width: "100%",
        height: "95vh",
        fontFamily: "Helvetica, Arial,sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        style={{ height: "90vh", width: "90vw" }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleOpenEvent}
        messages={{
          next: "sig",
          previous: "ant",
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
    </Box>
  );
};
