import { Box, Icon, Typography } from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const DepartamentoVer = ({ departamentos = [] }) => {
  const color = "black";
  const { departamentos: deptsCargados } = useSelector(
    (state) => state.gestionEvento
  );
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    if (departamentos.length > 0 && deptsCargados.length > 0) {
      const deptsMapeados = deptsCargados
        .filter((dept) => {
          return departamentos.includes(dept.id);
        })
        .map((dept) => {
          return {
            nombre: dept.departamento,
          };
        });
      setDepts(deptsMapeados);
    }
  }, [deptsCargados]);


  return (
    <Box mt={2}>
      <Typography
        variant="h3"
        sx={{
          color: "#164dc9",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        {departamentos.length > 1 ? "Departamentos:" : "Departamento:"}
      </Typography>
      <Box display={"flex"} mt={1} gap={2}>
        {depts.map((departamento, index) => {
          return (
            <Box display={"flex"} key={index} alignItems={"center"}>
              <Icon sx={{ fontSize: "1.7rem", color: color }}>
                <ApartmentOutlinedIcon />
              </Icon>
              <Typography
                variant="body1"
                sx={{
                  ml: 1,
                  fontWeight: "500",
                  color: color,
                  fontSize: "1.1rem",
                }}
              >
                {departamento.nombre}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
