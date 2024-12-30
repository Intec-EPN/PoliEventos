import { Box, DialogContentText, Typography } from "@mui/material";

export const DescripcionVer = ({ descripcion }) => {
  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight:"500", color: "#164dc9", fontSize: "1.2rem", my:0.5 }}
      >
        Descripcion:
      </Typography>
      <Typography variant="body1" sx={{fontSize: "1.1rem", fontWeight:"450"}}>{descripcion}</Typography>
    </Box>
  );
};
