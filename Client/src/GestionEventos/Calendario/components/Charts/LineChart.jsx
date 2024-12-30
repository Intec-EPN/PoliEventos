import { Box, Button, Tooltip, Typography } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
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

const LineChart = ({
  chartData,
  chartRef,
  handleSaveImage,
  handleDownloadCSV,
  handleDownloadFiles,
  handleDownloadExcel,
  totalEvents,
}) => {
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: { xs: 250, sm: 600, md: 700 } }}>
            <MuiLineChart
              xAxis={[
                {
                  scaleType: "band",
                  data: chartData.xAxis,
                  tickPlacement: "middle",
                  tickLabelPlacement: "middle",
                  tickLabelProps: {
                    angle: -90,
                    textAnchor: "end",
                    whiteSpace: "normal",
                  },
                },
              ]}
              series={chartData.series}
              height={300}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          width: "100%",
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

export default LineChart;
