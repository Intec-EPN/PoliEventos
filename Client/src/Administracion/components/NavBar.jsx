import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Grid2,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth, setChangeMediaQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.adminAuth.user);

  const onLogout = async () => {
    try {
      navigate("/");
      await dispatch(startLogout());
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const { opcion } = useSelector((state) => state.administracion);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: { sm: "100px" },
        backgroundColor: "white", // Color de fondo sólido
      }}
      color="white"
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        {/* Botón para usarlo en caso deusarlo en móvil */}
        <IconButton
          color="primario"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
          onClick={setChangeMediaQuery}
        >
          <MenuOutlined />
        </IconButton>

        <Grid2
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography
            variant="h3"
            fontWeight="600"
            noWrap
            component="div"
            color="primary"
          >
            {opcion}
          </Typography>
          <Box>
            <Typography variant="p">{user.roles[0].rol_nombre}</Typography>
            <IconButton onClick={onLogout} color="primary">
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};
