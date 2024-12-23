import {
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingArchivos } from "../../../../store/GestionEventos/thunk";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { limpiarFiles } from "../../../../store/GestionEventos/gestionEventosSlice";
import { Archivos } from "./Archivos"; 

export const ArchivosInicial = (eventId) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState({ archivos: [] });
  const [filesNames, setFilesNames] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [showArchivos, setShowArchivos] = useState(true);
  const { filesObtenidos } = useSelector((state) => state.gestionEvento);

  useEffect(() => {
    dispatch(startLoadingArchivos(eventId));
    dispatch(limpiarFiles());
  }, [dispatch]);

  useEffect(() => {
    if (filesObtenidos) {
      setFiles(filesObtenidos);
    }
  }, [filesObtenidos]);

  useEffect(() => {
    if (files?.archivos?.length > 0) {
      setFilesNames(files?.archivos?.map((file) => file.split("__")[0]));
    } else {
      setFilesNames([]);
    }
  }, [files]);

  const handleDeleteClick = (fileName) => {
    setFilesToDelete([...filesToDelete, { fileName, eventId }]);
    setFilesNames(filesNames.filter((name) => name !== fileName));
    eventId.onFilesToDeleteChange([...filesToDelete, { fileName, eventId }]);
  };

  const handleArchivosChange = (event) => {
    setShowArchivos(event.target.checked);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ width: "100%" }}
      gap={1}
    >
      {filesNames?.length > 0 && filesNames.map((file) => (
        <Box
          key={file}
          sx={{
            p: 1,
            px: 2,
            color: "white",
            backgroundColor: "#0a3b91",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {["png", "jpg", "jpeg", "webp"].includes(
            file.split(".").pop().toLowerCase()
          ) ? (
            <ImageIcon sx={{ fontSize: "1rem" }} />
          ) : (
            <DescriptionIcon sx={{ fontSize: "1rem" }} />
          )}
          <Typography fontSize="0.9rem">{file}</Typography>
          <IconButton onClick={() => handleDeleteClick(file)} sx={{ p: 0 }}>
            <HighlightOffIcon
              sx={{ fontSize: "1.1rem", pt: 0.3, color: "#ff6500" }}
            />
          </IconButton>
        </Box>
      ))}
      {filesNames?.length === 0 && (
        <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
          {showArchivos && <Archivos onFilesChange={eventId.onFilesChange} />}
        </Box>
      )}
    </Box>
  );
};
