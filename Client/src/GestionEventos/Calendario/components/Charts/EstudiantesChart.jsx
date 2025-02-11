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

const EstudiantesChart = ({
  chartData,
  chartRef,
  handleSaveImage,
  handleDownloadCSV,
  handleDownloadFiles,
  handleDownloadExcel,
  totalEvents,
}) => {
  if (!chartData || !chartData.datasets.length) {
    return null;
  }

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((serie, index) => ({
      label: serie.label,
      data: serie.data,
      backgroundColor: esquemaColors[index % esquemaColors.length],
      borderColor: esquemaColors[index % esquemaColors.length],
      borderWidth: 1,
    })),
  };

  const options = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Estudiantes por fecha y categoría a lo largo del tiempo.",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Fechas",
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Número de estudiantes",
        },
      },
    },
  };

  return (
    <>
      <Box ref={chartRef} sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
              Número de eventos: {totalEvents}
            </Typography>
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

export default EstudiantesChart;
