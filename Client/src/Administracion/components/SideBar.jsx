import {
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { SideBarItem } from "./SideBarItem";
import SpeedIcon from "@mui/icons-material/Speed";
import { MenuOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const opciones = [
  { label: "Categorizaciones", path: "categorizaciones" },
  { label: "Roles", path: "roles" },
  { label: "Permisos", path: "permisos" },
  { label: "Logs", path: "logs" },
];

export const SideBar = ({ drawerWidth, mquery, setChangeMediaQuery }) => {
  // Creo el hook para navegar en el sidebar
  const navigate = useNavigate();
  // Ejecuto la navegación dependiendo el path
  const handleNavigation = (path) => {
    navigate(path);
  };

  
  return (
    // Div para observar un buen comportaiendo del sidebar en cuanto a tamaños.
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      color="primario"
    >
      <Drawer
        variant="persistent" // Para que la barra siempre aparezca
        open={!mquery}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#1e2c4f",
          }, // Cada opcion mostrará el ancho del sidebar.
        }}
      >
        <Toolbar sx={{ mt: 2 }}>
          <IconButton
            edge="start"
            sx={{ mr: { xs: 0, sm: 2 }, display: { sm: "none" } }}
            onClick={setChangeMediaQuery}
          >
            <MenuOutlined sx={{ color: "white" }} />
          </IconButton>

          <SpeedIcon sx={{ color: "white", mr: 1 }} />
          <Typography variant="h6" noWrap component="div" color="secundario">
            Administración
          </Typography>
        </Toolbar>
        <List>
          {opciones.map((opcion) => (
            <SideBarItem key={opcion.label} opcion={opcion.label} onClickNavigation={()=>handleNavigation(opcion.path)}/>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
