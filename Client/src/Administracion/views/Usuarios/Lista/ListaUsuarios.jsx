import { Box } from "@mui/material";
import { TablaUsuarios } from "./components/TablaUsuarios";

export const ListaUsuarios = () => {
  return (
    <Box ml={2} mt={2} width="97%">
      <div>ListaUsuarios</div>
      <TablaUsuarios />
    </Box>
  );
};
