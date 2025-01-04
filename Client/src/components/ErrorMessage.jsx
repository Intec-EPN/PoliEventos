import { Box, Button, Typography } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useNavigate } from "react-router-dom";

export const ErrorMessage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "90vh",
      }}
    >
      <Typography>Error</Typography>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontSize: "4rem", color: "#0a3b91" }}
        >
          4
        </Typography>
        <EventBusyIcon sx={{ fontSize: "4rem", color: "#0a3b91" }} />
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontSize: "4rem", color: "#0a3b91", ml:-0.5 }}
        >
          4
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "1.5rem" }}>
        ¡Lo sentimos! No hemos encontrado esa página.
      </Typography>
      <Typography sx={{ fontSize: "1rem" }}>
        Asegúrate de estar ingresando la ruta correctamente.
      </Typography>
      <Button
        onClick={handleHome}
        sx={{ backgroundColor: "#0a3b91", color: "white", mt: 2 }}
      >
        Regresa a los eventos
      </Button>
    </Box>
  );
};
