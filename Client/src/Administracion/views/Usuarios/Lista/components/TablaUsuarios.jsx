import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, TextField, useMediaQuery } from "@mui/material";
import { TarjetaRolLista } from "../../../Roles/components/TarjetaRolLista";
import { TarjetaRol } from "../../../Roles/components/TarjetaRol";
import { startDeletingUsuario } from "../../../../../store/Administracion/Usuarios/thunks";
import { IndicadoresUsuario } from "./IndicadoresUsuario";

function createData(name, detail1, detail2, detail3) {
  return {
    name,
    detail1,
    detail2,
    detail3,
  };
}

function Row(props) {
  const { row, roles } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");
  const { roles: rolesRecuperados } = useSelector((state) => state.rol);
  const { usuarios } = useSelector((state) => state.usuarios);

  const [rolesFiltrados, setRolesFiltrados] = React.useState(
    rolesRecuperados.filter((rolRecuperado) =>
      roles.some((rol) => rol.rol_nombre === rolRecuperado.rol)
    )
  );

  React.useEffect(() => {
    setRolesFiltrados(
      rolesRecuperados.filter((rolRecuperado) =>
        roles.some((rol) => rol.rol_nombre === rolRecuperado.rol)
      )
    );
  }, [usuarios]);

  const onBorrarUsuario = (usuarioId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmDelete) {
      dispatch(startDeletingUsuario(usuarioId));
    }
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            color: roles && roles.length === 0 ? "red" : "inherit",
          }}
        >
          {row.name}
        </TableCell>
        <TableCell align="center">{row.detail1}</TableCell>
        <TableCell align="center">{row.detail2}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => onBorrarUsuario(row.detail3)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Roles
              </Typography>
              <Box sx={{ width: "100%" }}>
                {!isMobileOrTablet &&
                  rolesFiltrados.map((rol, index) => (
                    <Grid2 key={index} size={{ xs: 4, sm: 12 }}>
                      <Box
                        my={2}
                        display={"flex"}
                        justifyContent={"center"}
                        width="100%"
                      >
                        <TarjetaRolLista
                          {...rol}
                          id={index}
                          lista={false}
                          horizontal={true}
                        />
                      </Box>
                    </Grid2>
                  ))}
                {isMobileOrTablet &&
                  rolesFiltrados.map((rol, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
                      <TarjetaRol {...rol} id={index} lista={false} />
                    </Grid2>
                  ))}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const TablaUsuarios = () => {
  const { usuarios } = useSelector((state) => state.usuarios);
  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const newRows = usuarios.map((usuario) => {
      const fecha = usuario.fecha.slice(0, usuario.fecha.indexOf("T"));
      return {
        data: createData(usuario.nombre, usuario.correo, fecha, usuario.id),
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
      row.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.data.detail1.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 1 }}>
        Filtro
      </Typography>
      <TextField
        label="Buscar por nombre o correo"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 1 }}>
        Usuarios
      </Typography>
      <IndicadoresUsuario />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Usuario</TableCell>
              <TableCell align="center">Correo</TableCell>
              <TableCell align="center">Fecha de registro</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.data.name} row={row.data} roles={row.roles} />
            ))}
            {/* {rows.map((row) => (
              <Row key={row.name} row={row.data} roles={row.roles} />
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
