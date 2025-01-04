import { useState, useRef, useEffect } from "react";
import { Box, Dialog, DialogTitle, Button, Tabs, Tab } from "@mui/material";
import { saveAs } from "file-saver";
import FormReporte from "./Reporte/FormReporte";
import SelectDepartamento from "./Reporte/SelectDepartamento";
import dayjs from "../../../dayjsConfig";
import html2canvas from "html2canvas";
import { useSelector, useDispatch } from "react-redux";
import {
  startLoadingArchivosPorIds,
  startLoadingEsquemasCategorias,
} from "../../../store/GestionEventos/thunk";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import SelectEsquemaCategorias from "./Reporte/SelectEsquemaCategorias";
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
      groupedData[key] = {};
    }

    event.esquemasCategorias.forEach((esquemaCategoria) => {
      const esquemaKey = esquemaCategoria.esquemaNombre;
      if (!groupedData[key][esquemaKey]) {
        groupedData[key][esquemaKey] = 0;
      }
      groupedData[key][esquemaKey]++;
    });
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
      esquemasCategorias: row.esquemasCategorias
        .map(
          (ec) => `${ec.esquemaNombre} - ${ec.categoriaNombre}`
        )
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
  const [departamentosFijo, setDepartamentosFijo] = useState([]);
  const chartRef = useRef(null);
  const { eventos, departamentos } = useSelector(
    (state) => state.gestionEvento
  );

  const { nivelDepartamento, departamentoNivelId } = useSelector(
    (state) => state.adminAuth
  );

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const { esquemasCategorias: esquemasCategoriasCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const [selectedEsquemaCategoria, setSelectedEsquemaCategoria] = useState([{ esquemaId: null, categoriaId: null }]);

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
        id: evento.id, // Agregar el id del evento
        date: dayjs(evento.start).format("YYYY-MM-DD"),
        name: evento.title,
        departamentos: evento.data.departamento,
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
  };

  const filterEvents = (startDate, endDate) => {
    if (nivelDepartamento && departamentoNivelId != null) {
      return departamentosFijo;
    }

    return events.filter((event) => {
      const eventDate = dayjs(event.date);
      const start = startDate ? dayjs(startDate) : null;
      const end = endDate ? dayjs(endDate) : null;
      const matchesDepartment = selectedDepartments.length === 0 || event.departamentos.some((dep) => selectedDepartments.includes(dep));
      const matchesEsquemaCategoria = selectedEsquemaCategoria.some(
        (selected) =>
          !selected.esquemaId || event.esquemasCategorias.some(
            (ec) =>
              ec.esquemaId === selected.esquemaId &&
              (!selected.categoriaId || ec.categoriaId === selected.categoriaId)
          )
      );

      return (
        (!start || eventDate.isSameOrAfter(start)) &&
        (!end || eventDate.isSameOrBefore(end)) &&
        matchesDepartment &&
        matchesEsquemaCategoria
      );
    });
  };

  useEffect(() => {
    if (departamentoNivelId != null) {
      setDepartamentosFijo(
        events.filter((event) =>
          event.departamentos.includes(departamentoNivelId)
        )
      );
    }
  }, [events]);

  const handleGenerateChart = (timeRange, startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const filteredEvents = filterEvents(startDate, endDate);

    const groupedData = groupEventsByTimeRange(
      filteredEvents,
      timeRange,
      selectedDepartments
    );

    const sortedKeys = Object.keys(groupedData).sort((a, b) =>
      dayjs(a).isBefore(dayjs(b)) ? -1 : 1
    );

    const seriesData = esquemasCategorias.map((esquema, index) => ({
      label: esquema.label,
      data: sortedKeys.map((key) => groupedData[key][esquema.label] || 0),
      color: esquemaColors[index % esquemaColors.length],
    }));

    const pieChartData = esquemasCategorias.map((esquema, index) => ({
      id: index,
      value: filteredEvents.reduce((acc, event) => {
        const count = event.esquemasCategorias.filter(
          (ec) => ec.esquemaNombre === esquema.label
        ).length;
        return acc + count;
      }, 0),
      label: esquema.label,
    }));

    setChartData({
      xAxis: sortedKeys,
      series: seriesData.map((serie) => ({
        ...serie,
        data: serie.data.map((value) => (isNaN(value) ? 0 : value)),
      })),
      pieChartData,
      totalEvents: filteredEvents.length,
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
      departamentos: event.departamentos
        .map((depId) => {
          const dep = departamentos.find((dep) => dep.id === depId);
          return dep ? dep.departamento : depId;
        })
        .join(", "),
      esquemasCategorias: event.esquemasCategorias
        .map(
          (ec) => `${ec.esquemaNombre} - ${ec.categoriaNombre}`
        )
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
        <SelectEsquemaCategorias 
          selectedEsquemaCategoria={selectedEsquemaCategoria}
          setSelectedEsquemaCategoria={setSelectedEsquemaCategoria}
        />
        <FormReporte onGenerateChart={handleGenerateChart} />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Barras" {...a11yProps(0)} />
            <Tab label="Pastel" {...a11yProps(1)} />
            <Tab label="Líneas" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {chartData && (
            <BarChart
              chartData={chartData}
              chartRef={chartRef}
              handleSaveImage={handleSaveImage}
              handleDownloadCSV={handleDownloadCSV}
              handleDownloadFiles={handleDownloadFiles}
              handleDownloadExcel={handleDownloadExcel}
              totalEvents={chartData.totalEvents}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {chartData && (
            <PieChart
              chartData={chartData.pieChartData}
              chartRef={chartRef}
              handleSaveImage={handleSaveImage}
              handleDownloadCSV={handleDownloadCSV}
              handleDownloadFiles={handleDownloadFiles}
              handleDownloadExcel={handleDownloadExcel}
              totalEvents={chartData.totalEvents}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {chartData && (
            <LineChart
              chartData={chartData}
              chartRef={chartRef}
              handleSaveImage={handleSaveImage}
              handleDownloadCSV={handleDownloadCSV}
              handleDownloadFiles={handleDownloadFiles}
              handleDownloadExcel={handleDownloadExcel}
              totalEvents={chartData.totalEvents}
            />
          )}
        </CustomTabPanel>
      </Box>
    </Dialog>
  );
};
