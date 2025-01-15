import { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";

const FormReporte = ({ onGenerateChart }) => {
  const [timeRange, setTimeRange] = useState("week");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateChart = () => {
    onGenerateChart(timeRange, startDate, endDate);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 1, fontSize: "0.9rem" }}>
          Filtra por tiempo
        </Typography>
      </Box>
      <Box
        display={"flex"}
        gap={2}
        alignItems={"center"}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <TextField
          select
          label="Rango de tiempo"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="month">Mes</MenuItem>
          <MenuItem value="week">Semana</MenuItem>
          <MenuItem value="year">Año</MenuItem>
        </TextField>
        <TextField
          label="Fecha de inicio"
          type="date"
          value={startDate}
          fullWidth
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Fecha de fin"
          type="date"
          value={endDate}
          fullWidth
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button
          color="primary"
          variant="outlined"
          onClick={handleGenerateChart}
          sx={{
            backgroundColor: "#008000",
            color: "white",
            py: 1,
            px: 3,
            width: "85%",
            mt: 0.7,
          }}
        >
          Generar gráficos
        </Button>
      </Box>
    </>
  );
};

export default FormReporte;
