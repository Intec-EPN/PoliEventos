export const dept = ["DETRI", "DACI", "DEE"];

export const permisos = {
    Propio: {
        nombre: "Propio",
        color: "primary",
        acciones: [1],
    },
    Departamento: {
        nombre: "Departamento",
        color: "#c44b00",
        acciones: [2,3,4,5],
    },
    Facultad: {
        nombre: "Facultad",
        color: "#bd0000",
        acciones: [6,7,8,9],
    },
};

export const acciones = [
    {
      id: 1,
      accion: "Gestionar evento",
      tooltip: "Crear, editar, eliminar y descargar información privada de un elemento propio.",
      bgColor: "#d4e1f2",
    },
    {
      id: 2,
      accion: "Editar evento",
      tooltip: "Editar evento que pertenezca al departamento.",
      bgColor: "#f2e6b2",
    },
    {
      id: 3,
      accion: "Eliminar evento",
      tooltip: "Eliminar evento que pertenezca al departamento",
      bgColor: "#f2d89f",
    },
    {
      id: 4,
      accion: "Generar reporte",
      tooltip: "Generar reporte de cualquier evento en el departamento.",
      bgColor: "#f1ce81",
    },
    {
      id: 5,
      accion: "Descargar privada",
      tooltip: "Descargar información privada de evento de departamento.",
      bgColor: "#f2b873",
    },
    {
      id: 6,
      accion: "Editar evento",
      tooltip: "Editar evento que pertenezca al facultad.",
      bgColor: "#f2c9c9",
    },
    {
      id: 7,
      accion: "Eliminar evento",
      tooltip: "Eliminar evento que pertenezca al facultad",
      bgColor: "#f2a1a1",
    },
    {
      id: 8,
      accion: "Generar reporte",
      tooltip: "Generar reporte de cualquier evento en el facultad.",
      bgColor: "#f28585",
    },
    {
      id: 9,
      accion: "Descargar privada",
      tooltip: "Descargar información privada de evento de facultad.",
      bgColor: "#f57171",
    }
  ];
  