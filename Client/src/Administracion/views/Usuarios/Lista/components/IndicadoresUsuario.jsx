import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SquareIcon from "@mui/icons-material/Square";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

export const IndicadoresUsuario = () => {
  return (
    <Box
      display="flex"
      sx={{
        gap: { xs: 1, md: 2 },
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        justifyContent: { xs: "center", md: "left" },
        padding: { xs: 1, md: 0 },
        mt: 2.5,
      }}
      mb={1}
    >
      <Box display="flex" gap={1}>
        <EditIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">Editar usuario.</Typography>
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

      {/* Separacion */}
      <Box display="flex" gap={1}>
        <ToggleOnIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">Habilitar/inhabilitar usuario.</Typography>
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

      {/* Separacion */}
      <Box display="flex" gap={1} alignItems="center">
        <DeleteIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">
          Elimina un usuario. Esta acción no se puede deshacer.
        </Typography>
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
        <SquareIcon sx={{ color: "#dc8626", width: "1.3rem" }} />
        <Typography variant="p" color="#dc8626">
          Usuario sin roles asignados.
        </Typography>
      </Box>
    </Box>
  );
};
