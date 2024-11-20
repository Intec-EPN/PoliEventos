import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { ModalEvento } from "./components/ModalEvento";
import { useState } from "react";
import dayjs from "../../dayjsConfig";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setEnd,
  setEventoCreacion,
  setStart,
} from "../../store/GestionEventos/gestionEventosSlice";
import { startCreateEvento } from "../../store/GestionEventos/thunk";

const localizer = dayjsLocalizer(dayjs);

export const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: "Reunión",
      start: dayjs("2024-11-18T10:00:00").toDate(),
      end: dayjs("2024-11-18T12:00:00").toDate(),
    },
    {
      title: "Almuerzo",
      start: dayjs("2024-11-18T10:30:00").toDate(),
      end: dayjs("2024-11-18T12:30:00").toDate(),
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

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
    } = data;

    const start = dayjs(
      `${startDate} ${startTime}`,
      "MM/DD/YYYY hh:mm A"
    ).toISOString();
    const end = dayjs(
      `${endDate} ${endTime}`,
      "MM/DD/YYYY hh:mm A"
    ).toISOString();
    dispatch(
      setEventoCreacion({
        titulo,
        lugar,
        descripcion,
        departamento,
        esquemasCategorias,
        personasCargo,
        start,
        end,
      })
    );
    // dispatch(startCreateEvento());
    setModalIsOpen(false);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Calendar
        style={{ height: "90vh", width: "90vw" }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
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
    </Box>
  );
};
