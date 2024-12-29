import { Box, Button, Tooltip, Typography } from "@mui/material";
import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import ImageIcon from "@mui/icons-material/Image";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import PrintIcon from "@mui/icons-material/Print";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";

const BarChart = ({
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
      <Box ref={chartRef} sx={{ width: "100%" }}>
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
        <Box sx={{ width: { xs: 250, sm: 600, md: 700 } }}>
          <MuiBarChart
            borderRadius={5}
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

export default BarChart;
