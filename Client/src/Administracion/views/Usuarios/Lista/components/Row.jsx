import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, useMediaQuery } from "@mui/material";
import { TarjetaRolLista } from "../../../Roles/components/TarjetaRolLista";
import { TarjetaRol } from "../../../Roles/components/TarjetaRol";
import {
  startChangingEnabled,
  startDeletingUsuario,
} from "../../../../../store/Administracion/Usuarios/thunks";
import { setUsuarioActual } from "../../../../../store/Administracion/Usuarios/usuariosSlice";
import { useNavigate } from "react-router-dom";

import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PopUpEliminar from "../../../../components/PopUpEliminar";

export const Row = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { row, roles, conEventos, onBorrarUsuario } = props;
  const [open, setOpen] = React.useState(false);
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
  }, [usuarios, dispatch]);

  // Editar usuario.
  const onEditUsuario = (usuarioId) => {
    dispatch(setUsuarioActual(usuarioId));
    navigate(`/admin/usuarios/${usuarioId}/editar`);
  };

  // Habilitar/Desabilitar usuario.
  const onCambiarHabilitacion = (usuarioId) => {
    dispatch(startChangingEnabled(usuarioId));
  };

  // Borrar usuario.
  const handleBorrarUsuario = (usuarioId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmDelete) {
      dispatch(startDeletingUsuario(usuarioId));
      onBorrarUsuario();
    }
  };

  // Navegar a asignar rol.
  const onAsignarRol = () => {
    navigate("/admin/usuarios/asignar");
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          backgroundColor: roles.length === 0 ? "#dc8626" : "inherit",
          color: "white",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ color: "white", fontSize: "1rem" }}
        >
          {row.nombre}
        </TableCell>
        <TableCell align="center" sx={{ color: "white", fontSize: "1rem" }}>
          {row.correo}
        </TableCell>
        {!isMobileOrTablet && (
          <TableCell align="center" sx={{ color: "white", fontSize: "1rem" }}>
            {row.fecha}
          </TableCell>
        )}
        <TableCell align="center">
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"end"}
          >
            <Box
              display={"flex"}
              width={{ xs: "100%", md: "60%" }}
              alignItems={"center"}
            >
              <Box flex={1}>
                <IconButton onClick={() => onEditUsuario(row.id)}>
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
              <Box flex={1}>
                {row.habilitado ? (
                  <IconButton onClick={() => onCambiarHabilitacion(row.id)}>
                    <Box
                      sx={{
                        color: roles.length === 0 ? "white" : "#36b257",
                        display: "inline-flex",
                      }}
                    >
                      <ToggleOnIcon />
                    </Box>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onCambiarHabilitacion(row.id)}>
                    <Box
                      sx={{
                        color: roles.length === 0 ? "white" : "red",
                        display: "inline-flex",
                      }}
                    >
                      <ToggleOffIcon />
                    </Box>
                  </IconButton>
                )}
              </Box>
              <Box flex={2}>
                {!conEventos ? (
                  <IconButton onClick={() => handleBorrarUsuario(row.id)}>
                    <DeleteIcon
                      sx={{ color: "white", display: "inline-flex" }}
                    />
                  </IconButton>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Usuario con eventos creados. (No se puede eliminar).
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={5}
          sx={{ backgroundColor: "white" }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {roles.length === 0 ? (
                  <>
                    Asigna un rol por favor.
                    <IconButton onClick={onAsignarRol}>
                      <ArrowOutwardIcon />
                    </IconButton>
                  </>
                ) : (
                  "Rol"
                )}
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
                      <Box mb={2}>
                        <TarjetaRol {...rol} id={index} lista={false} />
                      </Box>
                    </Grid2>
                  ))}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} sx={{ padding: 0, backgroundColor: "#fff" }}>
          <Box sx={{ height: "1rem" }} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
