import { Box, DialogContentText, Typography } from "@mui/material";

export const LugarVer = ({ lugar }) => {
  return (
    <Box display="flex" sx={{ width: "auto" }} alignItems={"center"}>
      <Typography
        variant="h3"
        sx={{
          fontWeight:"500",
          color: "#164dc9",
          fontSize: "1.2rem",
          my: 0.5,
        }}
      >
        Lugar:
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", mr: 1, ml: 1, fontWeight:"500"}}>
        {lugar}
      </Typography>
    </Box>
  );
};
