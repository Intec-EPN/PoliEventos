import {
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RolesSubItem } from "./RolesSubItem";
import { useDispatch } from "react-redux";
import { opcionActual } from "../../store/Administracion/administracionSlice";
import { UsuariosSubItem } from "./UsuariosSubItem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const SideBarItem = ({
  opcion = " ",
  onClickNavigation,
  isOpen,
  toggleDrawer,
}) => {
  // Manejar store en redux para seleccionar la opción actual:
  const dispatch = useDispatch();
  const handleClick = (value) => {
    onClickNavigation();
    dispatch(opcionActual(value));
  };

  return (
    <>
      {opcion !== "Roles" && opcion !== "Usuarios" ? (
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              color: "white",
              width: "100%",
              "& .MuiListItemIcon-root": {
                color: "white!important", // Color blanco por defecto
              },
              "& .MuiSvgIcon-root": {
                color: "white!important", // Color blanco por defecto
              },
              "&:hover": {
                backgroundColor: "#d3d3d3",
                color: "#1e2c4f!important",
                "& .MuiListItemIcon-root": {
                  color: "#1e2c4f!important", // Color azul cuando está en hover
                },
                "& .MuiSvgIcon-root": {
                  color: "#1e2c4f!important", // Color azul cuando está en hover
                },
              },
              "&:focus": {
                backgroundColor: "#d3d3d3",
                color: "#1e2c4f!important",
                "& .MuiListItemIcon-root": {
                  color: "#1e2c4f!important", // Color azul cuando está en focus
                },
                "& .MuiSvgIcon-root": {
                  color: "#1e2c4f!important", // Color azul cuando está en focus
                },
              },
            }}
            onClick={() => handleClick(opcion)}
          >
            <Grid2 display={"flex"} alignItems={"center"}>
              <ListItemText primary={opcion} sx={{ ml: 1 }} />
              {opcion == "Permisos" && (
                <ListItemIcon >
                  <InfoOutlinedIcon
                    sx={{
                      ml: 1,
                      width: "1.3rem",
                      color: "#1e2c4f",
                    }}
                  />
                </ListItemIcon>
              )}
            </Grid2>
          </ListItemButton>
        </ListItem>
      ) : opcion === "Roles" ? (
        <RolesSubItem
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          onClick={onClickNavigation}
        />
      ) : opcion === "Usuarios" ? (
        <UsuariosSubItem
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          onClick={onClickNavigation}
        />
      ) : null}
    </>
  );
};
