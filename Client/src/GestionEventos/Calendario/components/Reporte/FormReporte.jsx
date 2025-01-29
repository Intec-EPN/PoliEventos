import { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const FormReporte = ({ onGenerateChart, selectedEsquemaCategoria }) => {
  const [timeRange, setTimeRange] = useState("month");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleGenerateChart = () => {
    onGenerateChart(
      timeRange,
      startDate ? startDate.format("YYYY-MM") : "",
      endDate ? endDate.format("YYYY-MM") : ""
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6" sx={{ mb: 1, fontSize: "0.9rem" }}>
          Filtra por tiempo
        </Typography>
      </Box>
      <Box
        display={"flex"}
        gap={2}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box display={"flex"} gap={2} alignItems={"center"} justifyContent={"flex-start"} width={"100%"} flexDirection={{xs:"column", sm:"row"}}>
          <TextField
            select
            label="Rango de tiempo"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={{ width: "100%", pb:1 }}
            margin="normal"
          >
            <MenuItem value="month">Mes</MenuItem>
            <MenuItem value="year">Año</MenuItem>
          </TextField>
          {timeRange === "month" && (
            <>
              <DatePicker
                label="Mes de inicio"
                views={["year", "month"]}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
              <DatePicker
                label="Mes de fin"
                views={["year", "month"]}
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </>
          )}
          {timeRange === "year" && null}
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleGenerateChart}
          disabled={!selectedEsquemaCategoria[0].esquemaId}
          sx={{
            backgroundColor: "#008000",
            color: "white",
            py: 1,
            px: 3,
            width: "100%",
            mt: 0.7,
          }}
        >
          {!selectedEsquemaCategoria[0].esquemaId ? (
            <span style={{ color: "#d3d3d3" }}>Seleccione esquema.</span>
          ) : (
            "Generar gráficos"
          )}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default FormReporte;
