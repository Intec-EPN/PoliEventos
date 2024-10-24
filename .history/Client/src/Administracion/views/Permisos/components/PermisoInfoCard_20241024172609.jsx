import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export const PermisoInfoCard = ({ permiso, tooltip, bgColor, colorLetra }) => {
    console.log('debug: ', bgColor, colorLetra );
    
  return (
    <Box display={"flex"} justifyContent={"center"} mb={2}>
      <Card
        sx={{
          display: { xs: "block", md: "flex" },
          width: { xs: "100%", md: "60%" },
        }}
      >
        <CardContent
          sx={{
            backgroundColor:bgColor,
            flex: "3",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: colorLetra , fontSize: 17, fontWeight: 600 }}
          >
            {permiso}
          </Typography>
        </CardContent>
        <CardContent sx={{ backgroundColor: "white", flex: "7" }}>
          <Typography variant="body1" sx={{ fontSize: 17, fontWeight: 600 }}>
            {tooltip}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
