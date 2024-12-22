import { Box, IconButton, Typography, FormControlLabel, Checkbox } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useState } from "react";
import { LinkArchivo } from "./LinkArchivo"; // Importar LinkArchivo

export const EnlaceInicial = ({ enlace }) => {
  const { enlaces } = enlace;
  const [eliminarEnlace, setEliminarEnlace] = useState(false);
  const [showLinkArchivo, setShowLinkArchivo] = useState(false);

  const handleDeleteClick = () => {
    setEliminarEnlace(true);
  };

  const handleLinkArchivoChange = (event) => {
    setShowLinkArchivo(event.target.checked);
  };

  return (
    <>
      {!eliminarEnlace && enlaces ? (
        <Box
          display={"inline-flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <a
            href={enlaces}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "#0a3b91",
              borderRadius: 0,
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              height: "100%",
            }}
          >
            <ArrowOutwardIcon
              sx={{ fontSize: "1rem", color: "white", pl: 1, py: 1.3 }}
            />
            <Typography
              sx={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#0a3b91",
                ml: 0.5,
                fontSize: "0.9rem",
              }}
            >
              {enlaces}
            </Typography>
          </a>
          <IconButton
            sx={{
              p: 0,
              borderRadius: 0,
              backgroundColor: "#0a3b91",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              height: "100%",
              "&:hover": {
                backgroundColor: "#0a3b91",
              },
              "&:focus": {
                backgroundColor: "#0a3b91",
              },
              "&:active": {
                backgroundColor: "#0a3b91",
              },
            }}
            onClick={handleDeleteClick}
          >
            <HighlightOffIcon
              sx={{
                fontSize: "1.1rem",
                height: "2.15rem",
                pt: 0.3,
                color: "#ff6500",
                pl: 1,
                pr: 1,
              }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box>
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
      )}
    </>
  );
};
