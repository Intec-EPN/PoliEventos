import { useState, useRef, useEffect } from "react";
import { Box, Dialog, DialogTitle, Button, Tabs, Tab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormReporte from "./Reporte/FormReporte";
import SelectDepartamento from "./Reporte/SelectDepartamento";
import SelectEsquemaCategorias from "./Reporte/SelectEsquemaCategorias";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import AsistentesChart from "./Charts/AsistentesChart";
import EstudiantesChart from "./Charts/EstudiantesChart";
import {
  startLoadingArchivosPorIds,
  startLoadingEsquemasCategorias,
} from "../../../store/GestionEventos/thunk";
import { saveAs } from "file-saver";
import dayjs from "../../../dayjsConfig";
import html2canvas from "html2canvas";
import XLSX from "xlsx";

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

const groupEventsByTimeRangeAndCategory = (
  events,
  selectedEsquema,
  timeRange
) => {
  const groupedData = {};
  events.forEach((event) => {
    let dateKey;
    if (timeRange === "month") {
      dateKey = dayjs(event.date).format("YYYY-MM");
    } else if (timeRange === "year") {
      dateKey = dayjs(event.date).format("YYYY");
    }

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = {};
    }

    event.esquemasCategorias.forEach((esquemaCategoria) => {
      if (esquemaCategoria.esquemaId === selectedEsquema) {
        const categoriaKey = esquemaCategoria.categoriaNombre;
        if (!groupedData[dateKey][categoriaKey]) {
          groupedData[dateKey][categoriaKey] = 0;
        }
        groupedData[dateKey][categoriaKey]++;
      }
    });
  });
  return groupedData;
};

const getMonthName = (dateKey) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [year, month] = dateKey.split("-");
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
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
      esquemasCategorias: row.esquemasCategorias
        .map((ec) => `${ec.esquemaNombre} - ${ec.categoriaNombre}`)
        .join(", "),
    }))
  );

  return array
    .map((row) => {
      return Object.values(row).toString();
    })
    .join("\n");
};

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const ModalReporte = ({ modalIsOpen, setModalIsOpen }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const chartRef = useRef(null);
  const { eventos, departamentos } = useSelector(
    (state) => state.gestionEvento
  );

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const { esquemasCategorias: esquemasCategoriasCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const [selectedEsquemaCategoria, setSelectedEsquemaCategoria] = useState([
    { esquemaId: null, categoriaId: null },
  ]);

  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);

  const esquemasCategorias = esquemasCategoriasCargados
    ? esquemasCategoriasCargados.map((esquemaCategoria) => ({
        value: esquemaCategoria.esquemaId,
        label: esquemaCategoria.esquemaNombre,
        categorias: esquemaCategoria.categorias.map((categoria) => ({
          value: categoria.categoriaId,
          label: categoria.categoriaNombre,
        })),
      }))
    : [];

  useEffect(() => {
    if (eventos) {
      const eventosFormateados = eventos.map((evento) => ({
        id: evento.id,
        date: dayjs(evento.start).format("YYYY-MM-DD"),
        name: evento.title,
        departamentos: evento.data.departamento,
        enlace: evento.data.enlaces,
        asistentes: evento.data.asistentes,
        estudiantes: evento.data.estudiantes,
        esquemasCategorias: evento.data.esquemaCategoria.map(
          (esquemaCategoria) => {
            const esquema = esquemasCategorias.find(
              (e) => e.value === esquemaCategoria.esquemaId
            );
            const categoria = esquema
              ? esquema.categorias.find(
                  (c) => c.value === esquemaCategoria.categoriaId
                )
              : null;
            return {
              esquemaNombre: esquema
                ? esquema.label
                : esquemaCategoria.esquemaId,
              esquemaId: esquemaCategoria.esquemaId,
              categoriaNombre: categoria
                ? categoria.label
                : esquemaCategoria.categoriaId,
              categoriaId: esquemaCategoria.categoriaId,
            };
          }
        ),
      }));
      setEvents(eventosFormateados);
    }
  }, [eventos]);

  const handleClose = () => {
    setModalIsOpen(false);
    setChartData(null);
    setSelectedDepartments([]);
    setStartDate("");
    setEndDate("");
    setTabValue(0);
    setSelectedEsquemaCategoria([{ esquemaId: null, categoriaId: null }]);
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const filterEvents = (startDate, endDate) => {
    return events.filter((event) => {
      const eventDate = dayjs(event.date);
      const start = startDate ? dayjs(startDate).startOf("month") : null;
      const end = endDate ? dayjs(endDate).endOf("month") : null;
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        arraysEqual(selectedDepartments, event.departamentos);

      const matchesEsquemaCategoria =
        selectedEsquemaCategoria.length === 0 ||
        selectedEsquemaCategoria.some((selected) => {
          const result = selected.esquemaId &&
            event.esquemasCategorias.some(
              (ec) => ec.esquemaId === selected.esquemaId
            );
          return result;
        });

      return (
        (!start || eventDate.isSameOrAfter(start)) &&
        (!end || eventDate.isSameOrBefore(end)) &&
        matchesDepartment &&
        matchesEsquemaCategoria
      );
    });
  };

  const handleGenerateChart = (timeRange, startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const filteredEvents = filterEvents(startDate, endDate);

    const selectedEsquema = selectedEsquemaCategoria[0].esquemaId;
    const groupedData = groupEventsByTimeRangeAndCategory(
      filteredEvents,
      selectedEsquema,
      timeRange
    );

    const sortedDates = Object.keys(groupedData).sort((a, b) =>
      dayjs(a).isBefore(dayjs(b)) ? -1 : 1
    );

    const categories = Array.from(
      new Set(
        filteredEvents.flatMap((event) =>
          event.esquemasCategorias
            .filter((ec) => ec.esquemaId === selectedEsquema)
            .map((ec) => ec.categoriaNombre)
        )
      )
    );

    const seriesData = categories.map((category, index) => ({
      label: category,
      data: sortedDates.map((date) => groupedData[date][category] || 0),
      backgroundColor: esquemaColors[index % esquemaColors.length],
      borderColor: esquemaColors[index % esquemaColors.length],
      borderWidth: 1,
    }));

    const pieChartData = categories.map((category, index) => ({
      id: index,
      value: filteredEvents.reduce((acc, event) => {
        const count = event.esquemasCategorias.filter(
          (ec) => ec.categoriaNombre === category
        ).length;
        return acc + count;
      }, 0),
      label: category,
    }));

    const asistentesData = categories.map((category) => ({
      label: category,
      asistentes: filteredEvents.reduce((acc, event) => {
        const count = event.esquemasCategorias.filter(
          (ec) => ec.categoriaNombre === category
        ).length;
        return acc + count * event.asistentes;
      }, 0),
    }));

    const estudiantesData = categories.map((category) => ({
      label: category,
      estudiantes: filteredEvents.reduce((acc, event) => {
        const count = event.esquemasCategorias.filter(
          (ec) => ec.categoriaNombre === category
        ).length;
        return acc + count * event.estudiantes;
      }, 0),
    }));

    setChartData({
      xAxis:
        timeRange === "month" ? sortedDates.map(getMonthName) : sortedDates,
      series: seriesData,
      pieChartData,
      totalEvents: filteredEvents.length,
      asistentesData,
      estudiantesData,
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
    const filteredEvents = filterEvents(startDate, endDate);
    const csv = convertToCSV(filteredEvents, departamentos);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "events.csv");
  };

  const handleDownloadExcel = () => {
    const filteredEvents = filterEvents(startDate, endDate);
    const data = filteredEvents.map((event) => ({
      ...event,
      enlace: event.enlace ? event.enlace : "Sin enlace.",
      departamentos: event.departamentos
        .map((depId) => {
          const dep = departamentos.find((dep) => dep.id === depId);
          return dep ? dep.departamento : depId;
        })
        .join(", "),
      esquemasCategorias: event.esquemasCategorias
        .map((ec) => `${ec.esquemaNombre} - ${ec.categoriaNombre}`)
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Eventos");

    XLSX.writeFile(workbook, "events.xlsx");
  };

  const handleDownloadFiles = () => {
    const filteredEvents = filterEvents(startDate, endDate);
    const eventIds = filteredEvents.map((event) => event.id);
    dispatch(startLoadingArchivosPorIds(eventIds));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
            md: "80vw",
            lg: "70vw",
          },
          maxWidth: {
            xs: "90vw",
            md: "80vw",
            lg: "70vw",
          },
          height: {
            xs: "90vh",
            md: "90vh",
            lg: "90vh",
          },
          maxHeight: {
            xs: "90vh",
            md: "90vh",
            lg: "90vh",
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
        <SelectEsquemaCategorias
          selectedEsquemaCategoria={selectedEsquemaCategoria}
          setSelectedEsquemaCategoria={setSelectedEsquemaCategoria}
        />
        <FormReporte
          onGenerateChart={handleGenerateChart}
          selectedEsquemaCategoria={selectedEsquemaCategoria}
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Líneas" {...a11yProps(0)} />
            <Tab label="Pastel" {...a11yProps(1)} />
            <Tab label="Barras" {...a11yProps(2)} />
            <Tab label="Beneficiarios" {...a11yProps(3)} />
            <Tab label="Estudiantes" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {chartData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <LineChart
                chartData={chartData}
                chartRef={chartRef}
                handleSaveImage={handleSaveImage}
                handleDownloadCSV={handleDownloadCSV}
                handleDownloadFiles={handleDownloadFiles}
                handleDownloadExcel={handleDownloadExcel}
                totalEvents={chartData.totalEvents}
              />
            </Box>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          {chartData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <PieChart
                chartData={chartData.pieChartData}
                chartRef={chartRef}
                handleSaveImage={handleSaveImage}
                handleDownloadCSV={handleDownloadCSV}
                handleDownloadFiles={handleDownloadFiles}
                handleDownloadExcel={handleDownloadExcel}
                totalEvents={chartData.totalEvents}
              />
            </Box>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {chartData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <BarChart
                chartData={chartData}
                chartRef={chartRef}
                handleSaveImage={handleSaveImage}
                handleDownloadCSV={handleDownloadCSV}
                handleDownloadFiles={handleDownloadFiles}
                handleDownloadExcel={handleDownloadExcel}
                totalEvents={chartData.totalEvents}
              />
            </Box>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          {chartData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <AsistentesChart
                chartData={chartData.asistentesData}
                chartRef={chartRef}
                handleSaveImage={handleSaveImage}
                handleDownloadCSV={handleDownloadCSV}
                handleDownloadFiles={handleDownloadFiles}
                handleDownloadExcel={handleDownloadExcel}
                totalEvents={chartData.totalEvents}
              />
            </Box>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          {chartData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <EstudiantesChart
                chartData={chartData.estudiantesData}
                chartRef={chartRef}
                handleSaveImage={handleSaveImage}
                handleDownloadCSV={handleDownloadCSV}
                handleDownloadFiles={handleDownloadFiles}
                handleDownloadExcel={handleDownloadExcel}
                totalEvents={chartData.totalEvents}
              />
            </Box>
          )}
        </CustomTabPanel>
        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2, pb:2 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
