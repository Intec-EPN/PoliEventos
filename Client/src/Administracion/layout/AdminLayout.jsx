import { Box, useMediaQuery } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useEffect, useState } from "react";

const drawerWidth = 240;

export const AdminLayout = ({ children }) => {
  // Hook para recuperar el tamaño
  const mquery = useMediaQuery("(max-width:600px)");
  // Manejo del estado para abrir/cerrar el sidebar en pantallas pequeñas.
  const [isDrawerOpen, setIsDrawerOpen] = useState(!mquery);
  // Actualiza el estado del drawer al cambiar el tamaño de la pantalla
  useEffect(() => {
    setIsDrawerOpen(!mquery); // Mantener el sidebar abierto si no está en pantallas pequeñas
  }, [mquery]);
  // Función para manejar el cambio del estado del sidebar
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    // Div global
    <Box sx={{ display: "flex" }}>
      {/* NavBar */}
      <NavBar drawerWidth={drawerWidth} setChangeMediaQuery={toggleDrawer} />
      {/* SideBar */}
      <SideBar
        drawerWidth={drawerWidth}
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, mt: "100px", overflowY: "auto" }}
      >
        {children}
      </Box>
    </Box>
  );
};
