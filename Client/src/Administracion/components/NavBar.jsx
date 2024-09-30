import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Box, Grid2, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";


export const NavBar = ({ drawerWidth, setChangeMediaQuery }) => {

  const onLogout = () => {

  };

  const {opcion} = useSelector( state => state.administracion );

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
            color="primario"
          >
            {opcion}
          </Typography>
          <Box>
            <Typography variant="p">Jonathan Puente</Typography>
            <IconButton onClick={onLogout} color="primario">
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};
