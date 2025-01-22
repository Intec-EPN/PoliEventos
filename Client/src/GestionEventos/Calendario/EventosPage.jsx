import { Box, Fab, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Calendario } from "./Calendario";
import { EventoSimple } from "./components/EventoSimple";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadingDepartamentos,
  startLoadingEventos,
} from "../../store/GestionEventos/thunk";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../store/auth/thunks";
import EventIcon from "@mui/icons-material/Event";
import { ModalReporte } from "./components/ModalReporte";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { LogoutOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { PermisosUsuario } from "./components/PermisosUsuario";

export const EventosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formato, setFormato] = useState(true);
  const [modalReporteIsOpen, setModalReporteIsOpen] = useState(false);

  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const [events, setEvents] = useState([]);
  const [reportePermiso, setReportePermiso] = useState(false);

  const { eventos } = useSelector((state) => state.gestionEvento);
  const { user, nivelPropio, permisos } = useSelector(
    (state) => state.adminAuth
  );

  const { departamentos } = useSelector((state) => state.gestionEvento);

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

  const sortedEvents = events
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 10);

  const onLogout = async () => {
    try {
      await dispatch(startLogout());
      navigate("/");
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          textAlign: "center",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 2,
          pt: 0.4,
          pb: 0.9,
          zIndex: 50,
          boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.15)",
          ml: -1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent={"center"}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
            <Typography
              onClick={() => setFormato(false)}
              sx={{
                cursor: "pointer",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "#0a3b91",
                pt: 0.1,
                ml: { xs: 1.5, sm: 0 },
              }}
            >
              {user?.nombre}
            </Typography>
            <PersonIcon
              sx={{
                color: "#0a3b91",
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flex={2}
          justifyContent={"center"}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={0.5}
            flexWrap={"wrap"}
          >
            {/* <Typography
              onClick={() => setFormato(false)}
              sx={{
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#0a3b91",
                pt: 0.1,
              }}
            >
              Permisos
            </Typography> */}
            <PermisosUsuario permisos={permisos} />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent={"center"}
        >
          <Typography
            onClick={onLogout}
            sx={{
              cursor: "pointer",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              color: "#0a3b91",
            }}
          >
            Cerrar sesión
          </Typography>
          <IconButton onClick={onLogout}>
            <LogoutOutlined
              sx={{
                color: "#0a3b91",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "0.5rem",
        }}
      >
        {formato ? (
          <Box mt={"3rem"}>
            <Calendario />
          </Box>
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
                mt: { xs: 7, sm: 6 },
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
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 2,
          pt: 0.4,
          pb: 0.9,
          zIndex: 50,
          boxShadow: "0px -4px 2px -2px rgba(0, 0, 0, 0.15)",
          ml: -1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent={"center"}
        >
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
          flex={2}
          justifyContent={"center"}
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
              <Typography variant="caption" sx={{ color: "#333333", pt: 0.1 }}>
                {dep.departamento}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent={"center"}
        >
          {!nivelPropio && reportePermiso && (
            <>
              <Box
                alignItems="center"
                justifyContent={"center"}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Typography
                  onClick={handleOpenReporte}
                  sx={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#0a3b91",
                  }}
                >
                  Generar reporte
                </Typography>
                <IconButton onClick={handleOpenReporte}>
                  <AssessmentOutlinedIcon
                    sx={{
                      color: "#0a3b91",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                alignItems="center"
                justifyContent={"center"}
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#0a3b91",
                  }}
                >
                  Reporte en web
                </Typography>
                <IconButton disabled>
                  <AssessmentOutlinedIcon
                    sx={{
                      color: "#0a3b91",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                  />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
