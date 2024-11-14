import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <DeleteIcon sx={{ color: "#2c4175" }} />
      <Typography variant="p">
        Elimina un usuario. Ten en cuenta que esta acción no se puede deshacer.
      </Typography>
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

      <Typography variant="p" color="red">
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            marginRight: "8px",
          }}
        ></span>
        Usuarios sin roles asignados en rojo.
      </Typography>
    </Box>
  );
};
