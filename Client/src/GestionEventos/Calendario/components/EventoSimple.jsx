import { Box, Typography, Icon } from "@mui/material";
import dayjs from "../../../dayjsConfig";
import { GiMicrophone } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startLoadingDepartamentos } from "../../../store/GestionEventos/thunk";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const EventoSimple = ({ event }) => {
  const { title, start, end, data } = event;
  const { lugar, expositores, personasACargo, departamento } = data;
  const startDate = dayjs(start).format("D [de] MMMM [del] YYYY");
  const startTime = dayjs(start).format("HH:mm");
  const endTime = dayjs(end).format("HH:mm");
  const endDate = dayjs(end).format("D [de] MMMM [del] YYYY");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);

  const { departamentos: deptsCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const [depts, setDepts] = useState([]);

  useEffect(() => {
    if (departamento.length > 0 && deptsCargados.length > 0) {
      const deptsMapeados = deptsCargados
        .filter((dept) => {
          return departamento.includes(dept.id);
        })
        .map((dept) => {
          return {
            id: dept.id,
            nombre: dept.departamento,
          };
        });
      setDepts(deptsMapeados);
    }
  }, [deptsCargados, departamento]);

  return (
    <Box sx={{ width: { xs: "90%", md: "60%" }, margin: "0 auto", paddingBottom: 2 }}>
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "white",
          px: 2,
          py: 1,
          color: "#0a3b91",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <CalendarMonthIcon />
        {startDate}
        {endDate !== startDate ? ` al ${endDate}` : ""} <AccessTimeIcon /> {startTime} -{" "}
        {endTime}
      </Typography>
      <Box
        sx={{
          border: "3px solid #0a3b91",
          borderRadius: "10px",
          margin: "0 auto",
          pb: 1,
          width: "100%",
          mb: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "#0a3b91",
            px: 2,
            py: 1,
            color: "white",
          }}
        >
          {title} | {lugar}
          {depts?.map((dep) => (
            <Box
              sx={{ ml:"0.5rem", display: "inline-flex", gap: 0.5, alignItems: "center" }}
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
                  width: "5px",
                  height: "11px",
                }}
              ></span>
            </Box>
          ))}
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          flexWrap="wrap"
          gap={2}
          sx={{
            color: "#0a3b91",
            p: 1,
            backgroundColor: "white",
            width: "80%",
            ml: { xs: 1, sm: 4, md: 5 },
            pr: 3,
          }}
          justifyContent={{ xs: "flex-start", sm: "space-evenly" }}
        >
          {expositores?.map((expositor, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{ mb: { xs: 1, sm: 0 } }}
            >
              <Icon
                sx={{
                  fontSize: "1.2rem",
                  color: "black",
                  width: "auto",
                  height: "auto",
                  pt: "0.3rem",
                }}
              >
                <GiMicrophone />
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {expositor.nombre}
              </Typography>
            </Box>
          ))}
          {personasACargo?.map((persona, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{ mb: { xs: 1, sm: 0 } }}
            >
              <Icon
                sx={{
                  fontSize: "1.2rem",
                  color: "black",
                  width: "auto",
                  height: "auto",
                  pt: "0.3rem",
                }}
              >
                <AccountCircleOutlinedIcon />
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {persona.nombre}
              </Typography>
            </Box>
          ))}
          {depts.map((dept, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              sx={{ mb: { xs: 1, sm: 0 } }}
            >
              <Icon
                sx={{
                  fontSize: "1.2rem",
                  color: "black",
                  width: "auto",
                  height: "auto",
                  pt: "0.3rem",
                }}
              >
                <ApartmentOutlinedIcon />
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {dept.nombre}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
