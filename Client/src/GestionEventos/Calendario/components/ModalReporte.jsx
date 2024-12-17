import { useState, useRef, useEffect } from "react";
import { Box, Dialog, DialogTitle, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import FormReporte from "./Reporte/FormReporte";
import SelectDepartamento from "./Reporte/SelectDepartamento";
import dayjs from "../../../dayjsConfig";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";

const groupEventsByTimeRange = (events, timeRange, selectedDepartments) => {
  const groupedData = {};

  events.forEach((event) => {
    if (
      selectedDepartments.length > 0 &&
      (!event.departamentos ||
        !event.departamentos.some((dep) => selectedDepartments.includes(dep)))
    ) {
      return;
    }

    const date = dayjs(event.date);
    let key;

    if (timeRange === "week") {
      key = date.startOf("week").format("YYYY-MM-DD");
    } else if (timeRange === "month") {
      key = date.format("MMMM YYYY");
    } else if (timeRange === "year") {
      key = date.format("YYYY");
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key]++;
  });

  return groupedData;
};

const convertToCSV = (data, departamentos) => {
  const sortedData = data.sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
  );
  const array = [Object.keys(sortedData[0])].concat(
    sortedData.map((row) => ({
      ...row,
      departamentos: row.departamentos
        .map((depId) => {
          const dep = departamentos.find((dep) => dep.id === depId);
          return dep ? dep.departamento : depId;
        })
        .join(", "),
    }))
  );

  return array
    .map((row) => {
      return Object.values(row).toString();
    })
    .join("\n");
};

export const ModalReporte = ({ modalIsOpen, setModalIsOpen }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const chartRef = useRef(null);
  const { eventos, departamentos } = useSelector(
    (state) => state.gestionEvento
  );

  useEffect(() => {
    if (eventos) {
      const eventosFormateados = eventos.map((evento) => ({
        date: dayjs(evento.start).format("YYYY-MM-DD"),
        name: evento.title,
        departamentos: evento.data.departamento,
      }));
      setEvents(eventosFormateados);
    }
  }, [eventos]);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const filterEvents = (startDate, endDate) => {
    return events.filter((event) => {
      const eventDate = dayjs(event.date);
      const start = startDate ? dayjs(startDate) : null;
      const end = endDate ? dayjs(endDate) : null;

      return (
        (!start || eventDate.isSameOrAfter(start)) &&
        (!end || eventDate.isSameOrBefore(end)) &&
        (selectedDepartments.length === 0 ||
          event.departamentos.some((dep) => selectedDepartments.includes(dep)))
      );
    });
  };

  const handleGenerateChart = (timeRange, startDate, endDate) => {
    const filteredEvents = filterEvents(startDate, endDate);

    const groupedData = groupEventsByTimeRange(
      filteredEvents,
      timeRange,
      selectedDepartments
    );

    const sortedKeys = Object.keys(groupedData).sort((a, b) =>
      dayjs(a).isBefore(dayjs(b)) ? -1 : 1
    );

    setChartData({
      xAxis: sortedKeys,
      series: [
        { data: sortedKeys.map((key) => groupedData[key]), color: "#2c4175" },
      ],
    });
  };

  const handleSaveImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        width: chartRef.current.scrollWidth,
        height: chartRef.current.scrollHeight,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "chart.png");
        });
      });
    }
  };

  const handleDownloadCSV = () => {
    const filteredEvents = filterEvents();
    const csv = convertToCSV(filteredEvents, departamentos);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "events.csv");
  };

  return (
    <Dialog
      open={modalIsOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: 2,
          width: {
            xs: "90vw",
            md: "70vw",
            lg: "50vw",
          },
          maxWidth: {
            xs: "90vw",
            md: "70vw",
            lg: "50vw",
          },
          height: {
            xs: "90vh",
            md: "80vh",
            lg: "70vh",
          },
          maxHeight: {
            xs: "90vh",
            md: "80vh",
            lg: "70vh",
          },
        },
      }}
    >
      <DialogTitle>Reporte</DialogTitle>
      <Box
        sx={{ width: "95%", height: "100%", pb: 2, px: 2, margin: "0 auto" }}
      >
        <SelectDepartamento
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
        />
        <FormReporte onGenerateChart={handleGenerateChart} />
        {chartData && (
          <>
            <Box ref={chartRef} sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ width: { xs: 250, sm: 600, md: 700 } }}>
                <BarChart
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
                justifyContent: "end",
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
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};
