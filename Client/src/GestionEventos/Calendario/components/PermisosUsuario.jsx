import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const colores = [
  "#43b0db",
  "#f09b3c",
  "#f09229",
  "#dc8626",
  "#dc7400",
  "#4da93a",
  "#248d18",
  "#017b00",
  "#006f00",
];

export const PermisosUsuario = ({permisos, departamento, nivelFacultad}) => {
  const permisosIconos = permisos.map((permiso) => {
    let icon;
    if (permiso.permisoId == 2 || permiso.permisoId == 6) {
      icon = (
        <EditIcon
          sx={{
            fontSize: { xs: "0.9rem", sm: "0.9rem" },
          }}
        />
      );
    } else if (permiso.permisoId == 3 || permiso.permisoId == 7) {
      icon = (
        <DeleteIcon
          sx={{
            fontSize: { xs: "0.9rem", sm: "0.9rem" },
          }}
        />
      );
    } else if (permiso.permisoId == 4 || permiso.permisoId == 8) {
      icon = (
        <AssessmentOutlinedIcon
          sx={{
            fontSize: { xs: "0.9rem", sm: "0.9rem" },
          }}
        />
      );
    } else if (permiso.permisoId == 5 || permiso.permisoId == 9) {
      icon = (
        <DownloadIcon
          sx={{
            fontSize: { xs: "0.9rem", sm: "0.9rem" },
          }}
        />
      );
    } else {
      icon = (
        <ManageAccountsIcon
          sx={{
            fontSize: { xs: "0.9rem", sm: "0.9rem" },
          }}
        />
      );
    }
    return {
      ...permiso,
      icon: icon,
    };
  });

  const niveles = [
    { nombre: "PROPIO", icon: <PersonIcon sx={{ mr: "-0.1rem" }} /> },
    { nombre: "DEPARTAMENTO", icon: <ApartmentIcon /> },
    { nombre: "FACULTAD", icon: <AccountBalanceIcon /> },
  ];

  const getDepartamentoNombre = (id) => {
    switch (id) {
      case 1:
        return "DETRI";
      case 2:
        return "DACI";
      case 3:
        return "DEE";
      default:
        return "";
    }
  };

  const getDepartamentoColor = (id) => {
    switch (id) {
      case 1:
        return "#4b99d2";
      case 2:
        return "#a479b1";
      case 3:
        return "#fbbc04";
      default:
        return "transparent";
    }
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
      {niveles.map((nivel, nivelIndex) => (
        <React.Fragment key={nivelIndex}>
          {permisosIconos.some(
            (permiso) => permiso.nivelId === nivelIndex + 1
          ) && (
            <Box key={nivelIndex} display={"flex"} alignItems={"center"} ml={2}>
              <Tooltip title={nivel.nombre}>
                <Box
                  sx={{
                    color: "black",
                    marginRight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:"center"
                  }}
                >
                  {nivel.icon}
                </Box>
              </Tooltip>
              {nivel.nombre === "DEPARTAMENTO" && (
                <Typography
                  variant="body2"
                  sx={{
                    marginRight: 1.4,
                    color: getDepartamentoColor(departamento),
                    fontWeight: "bold",
                  }}
                >
                  {getDepartamentoNombre(departamento)}
                </Typography>
              )}
              {nivel.nombre === "FACULTAD" && nivelFacultad && (
                <Typography
                  variant="body2"
                  sx={{
                    marginRight: 1.4,
                    color: "#000", // Puedes cambiar el color si es necesario
                    fontWeight: "bold",
                  }}
                >
                  FIEE
                </Typography>
              )}
              <Box display={"flex"} gap={0.5}>
                {permisosIconos
                  .filter((permiso) => permiso.nivelId === nivelIndex + 1)
                  .map((permiso, index) => (
                    <Tooltip key={index} title={permiso.accionNombre}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: colores[permiso.permisoId - 1],
                          color: "white",
                        }}
                      >
                        {permiso.icon}
                      </Box>
                    </Tooltip>
                  ))}
              </Box>
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
