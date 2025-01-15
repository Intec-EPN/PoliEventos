import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import ImageIcon from "@mui/icons-material/Image";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import PrintIcon from "@mui/icons-material/Print";
import TableChartIcon from "@mui/icons-material/TableChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const esquemaColors = [
  "#4CAF50",
  "#F44336",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#FFC107",
  "#00BCD4",
  "#E91E63",
  "#607D8B",
  "#795548",
  "#3F51B5",
  "#8BC34A",
  "#FF5722",
  "#673AB7",
  "#009688",
];

const AsistentesChart = ({
  chartData,
  chartRef,
  handleSaveImage,
  handleDownloadCSV,
  handleDownloadFiles,
  handleDownloadExcel,
  totalEvents,
}) => {
  const data = {
    labels: chartData.map((data) => data.label),
    datasets: [{
      data: chartData.map((data) => data.asistentes),
      backgroundColor: chartData.map((_, index) => esquemaColors[index % esquemaColors.length]),
      borderColor: chartData.map((_, index) => esquemaColors[index % esquemaColors.length]),
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Asistentes por Esquema"
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <>
      <Box ref={chartRef} sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
          <Tooltip
            title="Recuerde que un evento puede tener varias categorizaciones."
            placement="right"
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#0842a0",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontFamily: "Roboto, sans-serif",
                },
              },
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
              Número de eventos: {totalEvents}
            </Typography>
          </Tooltip>
        </Box>
        <Box sx={{ width: { xs: 250, sm: 600, md: 700 }, margin: "0 auto" }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          width: "100%",
          mt:2
        }}
      >
        <Button
          variant="outlined"
          onClick={handleSaveImage}
          sx={{ color: "#354776" }}
          startIcon={<ImageIcon />}
        >
          Imagen
        </Button>
        <Button
          variant="outlined"
          onClick={handleDownloadCSV}
          sx={{ color: "#354776" }}
          startIcon={<SimCardDownloadIcon />}
        >
          CSV
        </Button>
        <Button
          variant="outlined"
          onClick={handleDownloadExcel}
          sx={{ color: "#354776" }}
          startIcon={<TableChartIcon />}
        >
          Excel
        </Button>
        <Button
          variant="outlined"
          onClick={handleDownloadFiles}
          sx={{ color: "#354776" }}
          startIcon={<PrintIcon />}
        >
          Descargar archivos
        </Button>
      </Box>
    </>
  );
};

export default AsistentesChart;
