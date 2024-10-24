import React from 'react';
import { Box, Card, CardContent, Typography, Tooltip, Avatar, Grid2 } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const niveles = [
  {
    nombre: 'Propio',
    color: '#FFF',
    icono: <PersonIcon />,
    acciones: [1],
  },
  {
    nombre: 'Departamento',
    color: '#FFF',
    icono: <ApartmentIcon />,
    acciones: [2, 3, 4, 5],
  },
  {
    nombre: 'Facultad',
    color: '#FFF',
    icono: <AccountBalanceIcon />,
    acciones: [6, 7, 8, 9],
  }
];

const acciones = [
  { id: 1, accion: 'Gestionar evento', tooltip: 'Crear, editar, eliminar y descargar información privada de un elemento propio.', bgColor: '#53cacf' },
  { id: 2, accion: 'Editar evento', tooltip: 'Editar evento que pertenezca al departamento.', bgColor: '#4da93a' },
  { id: 3, accion: 'Eliminar evento', tooltip: 'Eliminar evento que pertenezca al departamento.', bgColor: '#248d18' },
  { id: 4, accion: 'Generar reporte', tooltip: 'Generar reporte de cualquier evento en el departamento.', bgColor: '#017b00' },
  { id: 5, accion: 'Descargar privada', tooltip: 'Descargar información privada de evento de departamento.', bgColor: '#006f00' },
  { id: 6, accion: 'Editar evento', tooltip: 'Editar evento que pertenezca a la facultad.', bgColor: '#006af9' },
  { id: 7, accion: 'Eliminar evento', tooltip: 'Eliminar evento que pertenezca a la facultad', bgColor: '#005ad3' },
  { id: 8, accion: 'Generar reporte', tooltip: 'Generar reporte de cualquier evento en la facultad.', bgColor: '#004aad' },
  { id: 9, accion: 'Descargar privada', tooltip: 'Descargar información privada de evento de facultad.', bgColor: '#00347a' }
];

const AccionCard = ({ accion }) => {
  const accionData = acciones.find(a => a.id === accion);

  return (
    <Card sx={{ display: 'flex', my: 1, borderRadius: '12px', border: `1px solid ${accionData.bgColor}`, padding: '8px' }}>
      <Grid2 container>
        <Grid2 item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: accionData.bgColor, color: 'white', borderRadius: '8px' }}>
          <Typography variant="body1">{accionData.accion}</Typography>
        </Grid2>
        <Grid2 item xs={9} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
          <Tooltip title={accionData.tooltip}>
            <Typography variant="body2" color="textSecondary">{accionData.tooltip}</Typography>
          </Tooltip>
        </Grid2>
      </Grid2>
    </Card>
  );
};

const RolesComponent = () => {
  return (
    <Box>
      {niveles.map((nivel) => (
        <Box key={nivel.nombre} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2, backgroundColor: nivel.color }}>{nivel.icono}</Avatar>
            <Typography variant="h6">{nivel.nombre}</Typography>
          </Box>
          {nivel.acciones.map((accion) => (
            <AccionCard key={accion} accion={accion} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default RolesComponent;
