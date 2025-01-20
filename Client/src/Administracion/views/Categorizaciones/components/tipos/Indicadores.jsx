import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SquareIcon from "@mui/icons-material/Square";

export const Indicadores = ({ value, editar = false }) => {
  return (
    <Box
      display="flex"
      sx={{
        gap: 1,
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        justifyContent: { xs: "center", md: "left" },
        flexWrap: "wrap",
        padding: { xs: 1, md: "0rem" },
        mt: 2.5,
      }}
      mb={1}
    >
      <Box display="flex" gap={1}>
        <VisibilityIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">Visibilidad de la {value} al ingresar eventos.</Typography>
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
          Elimina la {value} (si es que no está en uso).
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
            <Typography variant="p">
              Edita la {value} o agrega categorías dentro.
            </Typography>
          </Box>
        </>
      ) : null}
      {value === "categorización" ? (
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
            <SquareIcon sx={{ color: "#dc8626", width: "1.3rem" }} />
            <Typography variant="p" color="#dc8626">
              Categorización vacía
            </Typography>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
