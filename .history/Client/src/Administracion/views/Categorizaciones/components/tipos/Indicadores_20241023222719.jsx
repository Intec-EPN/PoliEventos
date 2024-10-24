import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export const Indicadores = ({ value, editar = false }) => {
  return (
    <Box
      display="flex"
      sx={{
        gap: { xs: 1, md: 2 },
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        justifyContent: { xs: "center", md: "left" },
        padding: { xs: 1, md: 0 },
      }}
      mb={1}
    >
      <Box display="flex" gap={1}>
        <VisibilityIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">Cambia la visibilidad de {value}.</Typography>
      </Box>
      <Typography
        variant="p"
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        |
      </Typography>
      <Typography
        variant="p"
        sx={{ display: { xs: "block", sm: "none", md: "none" } }}
      >
        <hr></hr>
      </Typography>
      <Box display="flex" gap={1}>
        <DeleteIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">
          Elimina {value} (si es que no está en uso).
        </Typography>
      </Box>
      {editar ? (
        <>
          <Typography
            variant="p"
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            |
          </Typography>
          <Typography
            variant="p"
            sx={{ display: { xs: "block", sm: "none", md: "none" } }}
          >
            <hr></hr>
          </Typography>
          <Box display="flex" gap={1}>
            <EditIcon sx={{ color: "#2c4175" }} />
            <Typography variant="p">Edita {value}.</Typography>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
