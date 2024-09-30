import { Box, useMediaQuery } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useState } from "react";

const drawerWidth = 240;

export const AdminLayout = ({children}) => {
  // Hook para recuperar el tamaño
  const mquery = useMediaQuery("(max-width:600px)");
  // Manejo del tamaño para permitir abrir y cerrar sidebar en pantallas pequeñas.
  const [changeMediaQuery, setChangeMediaQuery] = useState(mquery);
  // Función para manejar el estado del estado changeMediaQuery.
  const onChangeMediaQuery = () => {
    setChangeMediaQuery(!changeMediaQuery);
  };

  return (
    // Div global
    <Box sx={{ display: "flex" }}>
      {/* NavBar */}
      <NavBar
        drawerWidth={drawerWidth}
        setChangeMediaQuery={onChangeMediaQuery}
      />
      {/* SideBar */}
      <SideBar
        drawerWidth={drawerWidth}
        mquery={changeMediaQuery}
        setChangeMediaQuery={onChangeMediaQuery}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 1, mt: "100px", overflowY: "auto"}}>
        {children}
      </Box>
    </Box>
  );
};
