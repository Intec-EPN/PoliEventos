import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


export const IndicadoresRoles = () => {
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
      {/* Separacion */}
      <Box display="flex" gap={1} alignItems="center">
        <DeleteIcon sx={{ color: "#2c4175" }} />
        <Typography variant="p">
          Elimina un rol. Esta acción no se puede deshacer.
        </Typography>
      </Box>
    </Box>
  );
};
