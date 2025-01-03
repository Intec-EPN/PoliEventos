import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

export const PermisoInfoCard = ({ permiso, tooltip, bgColor, colorLetra }) => {
  return (
    <Box display={"flex"} justifyContent={"center"} mb={3}>
      <Card
        sx={{
          display: { xs: "block", md: "flex" },
          width: { xs: "100%", md: "60%" },
        }}
      >
        <CardContent display="flex" sx={{alignContent:"center", backgroundColor: bgColor, flex: "2" }}>
          <Typography
            variant="body1"
            sx={{ color: colorLetra, fontSize: 17, fontWeight: 600 }}
          >
            {permiso}
          </Typography>
        </CardContent>
        <CardContent display="flex"  sx={{ alignContent:"center", backgroundColor: "#f9f9f9", flex: "8" }}>
          <Typography variant="body1" sx={{ fontSize: 17, fontWeight: 600 }}>
            {tooltip}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
