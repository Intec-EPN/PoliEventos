import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { IndicadoresUsuario } from "./IndicadoresUsuario";
import { Row } from "./Row";
import { useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import { startLoadingUsuarios } from "../../../../../store/Administracion/Usuarios/thunks";

function createData(nombre, correo, fecha, id, habilitado, conEventos) {
  return {
    nombre,
    correo,
    fecha,
    id,
    habilitado,
    conEventos,
  };
}

export const TablaUsuarios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuarios } = useSelector((state) => state.usuarios);
  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 960px)");

  React.useEffect(() => {
    const newRows = usuarios.map((usuario) => {
      const fecha = usuario.fecha.slice(0, usuario.fecha.indexOf("T"));

      return {
        data: createData(
          usuario.nombre,
          usuario.correo,
          fecha,
          usuario.id,
          usuario.habilitado,
          usuario.conEventos
        ),
        roles: usuario.roles,
      };
    });
    setRows(newRows);
  }, [usuarios]);

  // Filtro
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.data.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.data.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCrearUsuario = () => {
    navigate("/admin/usuarios/crear");
  };

  const handleActualizar = () => {
    dispatch(startLoadingUsuarios());
  }

  return (
    <Box>
      <IndicadoresUsuario />
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 2 }}>
        Filtro
      </Typography>
      <Box container display="flex" gap={2}>
        <Box sx={{ flex: 8 }}>
          <TextField
            label="Buscar por nombre o correo"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            width: "auto",
            mr: "1rem",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", height: 55 }}
            onClick={handleCrearUsuario}
          >
            Crear Usuario
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        justifyContent={"start"}
      >
        <Button sx={{ color:"#2c4175", my:2 }} onClick={handleActualizar}>
          <CachedIcon sx={{ fontSize: "1.5rem", color: "#2c4175" }} />
          <Typography sx={{ color: "#2c4175", ml: 1 }}>Actualizar</Typography>
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table
          aria-label="collapsible table"
          sx={{ backgroundColor: "#2c4175" }}
        >
          <TableHead sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "0.9rem" }}></TableCell>
              <TableCell sx={{ fontSize: "1.1rem", color: "#2c4175" }}>
                Usuario
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#2c4175",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Correo
              </TableCell>
              {!isMobile && (
                <TableCell
                  align="center"
                  sx={{
                    color: "#2c4175",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  Fecha de registro
                </TableCell>
              )}
              <TableCell
                align="center"
                sx={{
                  color: "#2c4175",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row
                key={row.data.nombre}
                row={row.data}
                roles={row.roles}
                conEventos={row.data.conEventos}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
