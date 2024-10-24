
export const PermisoInfoCard = ({permiso, tooltip, bgColor, colorLetra}) => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card
        sx={{
          display: { xs: "block", md: "flex" },
          width: { xs: "100%", md: "70%" },
        }}
      >
        <CardContent
          sx={{
            backgroundColor: {bgColor},
            flex: "3",
          }}
        >
          {/* //TODO
            // En el hola iría el permiso */}
          <Typography
            variant="body1"
            sx={{ color: "white", fontSize: 17, fontWeight: 600 }}
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
  )
}
