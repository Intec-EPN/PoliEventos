import { useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  DialogContentText,
} from "@mui/material";
import { Archivos } from "./Archivos";
import { LinkArchivo } from "./LinkArchivo";

export const TabArchivos = ({ sendFiles, onFilesChange }) => {
  const [showArchivos, setShowArchivos] = useState(true);
  const [showLinkArchivo, setShowLinkArchivo] = useState(true);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <DialogContentText sx={{ color: "#333333" }}>Agregar</DialogContentText>

      <DialogContentText sx={{ color: "#333333" }}>Archivos:</DialogContentText>
      {showArchivos && <Archivos onFilesChange={onFilesChange} />}

      <DialogContentText sx={{ color: "#333333" }}>Enlace:</DialogContentText>
      {showLinkArchivo && <LinkArchivo />}
    </Box>
  );
};
