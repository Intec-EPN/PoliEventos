import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { opcionActual } from "../../store/Administracion/administracionSlice";

export const RolesSubItem = () => {
  // Para manejar el valor de la opción
  const dispatch = useDispatch();

  // Manejar el submenú
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
    dispatch(opcionActual("Roles"));
  };

  // Creo el hook para navegar en el sidebar
  const navigate = useNavigate();

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Roles" sx={{ color: "white", ml: 1 }} />
        {open ? (
          <ExpandLess sx={{ color: "white" }} />
        ) : (
          <ExpandMore sx={{ color: "white" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ display: "block", backgroundColor: "#d9d9d9", borderRadius: "0 0 20px 20px", ml: 3, mr: 3, mb:1 }}
        >
          <ListItemButton 
            selected={false} // No se usa estado
            sx={{
              pl: 4, 
              width: "100%",
              "&.Mui-selected": {
                backgroundColor: "#004aad",
                "& .MuiListItemText-root": {
                  color: "white", // Cambia a blanco el texto
                },
              },
              "&:hover": {
                backgroundColor: "#004aad",
                "& .MuiListItemText-root": {
                  color: "white",
                },
              },
              "&:focus": {
                backgroundColor: "#004aad", // Color al tener foco
                "& .MuiListItemText-root": {
                  color: "white", // Texto blanco al tener foco
                },
              },
            }} 
            onClick={() => {
              navigate("roles/lista");
              dispatch(opcionActual("Lista de Roles"));
            }} 
          >
            <ListItemText primary="Lista de Roles" />
          </ListItemButton>
          <ListItemButton 
            selected={false} // No se usa estado
            sx={{
              pl: 4, 
              width: "100%",
              "&.Mui-selected": {
                backgroundColor: "#004aad",
                "& .MuiListItemText-root": {
                  color: "white", // Cambia a blanco el texto
                },
              },
              "&:hover": {
                backgroundColor: "#004aad",
                "& .MuiListItemText-root": {
                  color: "white",
                },
              },
              "&:focus": {
                backgroundColor: "#004aad",
                "& .MuiListItemText-root": {
                  color: "white",
                },
              },
            }} 
            onClick={() => {
              navigate("roles/crear");
              dispatch(opcionActual("Crea un Rol"));
            }} 
          >
            <ListItemText primary="Crear un Rol" />
          </ListItemButton>
        </List>
      </Collapse>
    </ListItem>
  );
};
