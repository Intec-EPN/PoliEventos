import { useState } from "react";
import { Box, FormControlLabel, Checkbox, DialogContentText } from "@mui/material";
import { Archivos } from "./Archivos";
import { LinkArchivo } from "./LinkArchivo";

export const TabArchivos = ({ sendFiles, onFilesChange }) => {
  const [showArchivos, setShowArchivos] = useState(false);
  const [showLinkArchivo, setShowLinkArchivo] = useState(false);

  const handleArchivosChange = (event) => {
    setShowArchivos(event.target.checked);
  };

  const handleLinkArchivoChange = (event) => {
    setShowLinkArchivo(event.target.checked);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <DialogContentText sx={{ color: "#333333" }}>
        Agregar
      </DialogContentText>
      <FormControlLabel
        control={
          <Checkbox
            checked={showArchivos}
            onChange={handleArchivosChange}
            color="primary"
          />
        }
        label="Archivos"
      />
      {showArchivos && <Archivos onFilesChange={onFilesChange} />}
      <FormControlLabel
        control={
          <Checkbox
            checked={showLinkArchivo}
            onChange={handleLinkArchivoChange}
            color="primary"
          />
        }
        label="Enlace"
      />
      {showLinkArchivo && <LinkArchivo />}
    </Box>
  );
};
