import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { ModalEvento } from "./components/ModalEvento";
import { useEffect, useState } from "react";
import dayjs from "../../dayjsConfig";
import { Box, IconButton, Typography } from "@mui/material";
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
import CircularProgress from "@mui/material/CircularProgress";

const localizer = dayjsLocalizer(dayjs);

export const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const { eventos } = useSelector((state) => state.gestionEvento);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { user, permisos } = useSelector((state) => state.adminAuth);

  let permisoCrearEvento = false;
  if (permisos) {
    permisoCrearEvento = permisos.some((permiso) => permiso.permisoId === 1);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true); // Iniciar carga
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
      setTimeout(() => setLoading(false), 3000); // Simular carga de 3 segundos
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
      enlaces,
      files
    } = data;

    const start = dayjs(`${startDate} ${startTime}`, "DD/MM/YYYY HH:mm");
    const end = dayjs(`${endDate} ${endTime}`, "DD/MM/YYYY HH:mm");

    if (!start.isValid() || !end.isValid()) {
      alert("Fecha u hora inválida.");
      return;
    }

    const eventoCreacion = {
      titulo,
      lugar,
      descripcion,
      departamento: departamento || [],
      esquemasCategorias,
      personasCargo,
      expositores,
      enlaces,
      start: start.toISOString(),
      end: end.toISOString(),

    };
    dispatch(setEventoCreacion(eventoCreacion));
    dispatch(startCreateEvento(files));
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "87vh",
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
            {permisoCrearEvento && (
              <ModalEvento
                modalIsOpen={modalIsOpen}
                setModalIsOpen={handleModalClose}
                handleAddEvent={handleAddEvent}
              />
            )}

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
