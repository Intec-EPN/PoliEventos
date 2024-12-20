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
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { IndicadoresUsuario } from "./IndicadoresUsuario";
import { Row } from "./Row";
import { useMediaQuery } from "@mui/material";

function createData(nombre, correo, fecha, id, habilitado) {
  return {
    nombre,
    correo,
    fecha,
    id,
    habilitado,
  };
}

export const TablaUsuarios = () => {
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
          usuario.habilitado
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

  return (
    <Box>
      <IndicadoresUsuario />
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 2 }}>
        Filtro
      </Typography>
      <TextField
        label="Buscar por nombre o correo"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper} elevation={0}>
        <Table
          aria-label="collapsible table"
          sx={{ backgroundColor: "#2c4175", color: "white" }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.2rem" }} />
              <TableCell sx={{ color: "white", fontSize: "1.1rem" }}>
                Usuario
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Correo
              </TableCell>
              {!isMobile && (
                <TableCell
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  Fecha de registro
                </TableCell>
              )}
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.data.nombre} row={row.data} roles={row.roles} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
