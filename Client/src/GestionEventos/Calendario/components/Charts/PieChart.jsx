import { Box, Button, Tooltip, Typography } from "@mui/material";
import {
  PieChart as MuiPieChart,
  pieArcLabelClasses,
} from "@mui/x-charts/PieChart";
import ImageIcon from "@mui/icons-material/Image";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import PrintIcon from "@mui/icons-material/Print";
import TableChartIcon from "@mui/icons-material/TableChart";

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

const PieChart = ({
  chartData,
  chartRef,
  handleSaveImage,
  handleDownloadCSV,
  handleDownloadFiles,
  handleDownloadExcel,
  totalEvents,
}) => {
  const totalValue = chartData.reduce((acc, data) => acc + data.value, 0);
  const pieChartData = chartData.map((data, index) => ({
    ...data,
    color: esquemaColors[index % esquemaColors.length],
    percentage: totalValue ? ((data.value / totalValue) * 100).toFixed(2) : 0,
  }));

  return (
    <>
      <Box ref={chartRef}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            fontFamily: "roboto, sans-serif",
          }}
        >
          <MuiPieChart
            series={[
              {
                data: pieChartData,
                arcLabel: (item) => `${item.percentage}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
              },
            ]}
            width={400}
            height={300}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "500",
                fontFamily: "roboto, sans-serif",
                fill: "#f9f9f9",
              },
              "& .MuiTooltip-tooltip": {
                fontFamily: "roboto, sans-serif",
              },
            }}
            slotProps={{
              legend: { hidden: true },
              tooltip: {
                componentsProps: {
                  tooltip: {
                    sx: {
                      fontFamily: "roboto, sans-serif",
                    },
                  },
                },
              },
            }}
          />
          <Box>
            {pieChartData.map((data, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: data.color,
                    mr: 1,
                  }}
                />
                <Typography>{data.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          width: "100%",
          mt: 3,
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

export default PieChart;
