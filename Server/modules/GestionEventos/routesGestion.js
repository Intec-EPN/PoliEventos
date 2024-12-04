const express = require('express');
const router = express.Router();

const { crearEvento, obtenerEventos } = require('./controllers/eventosController');
const { obtenerDepartamentosId } = require('../Administracion/controllers/Roles/departamentosController');
const { obtenerEsquemasCategoriasCalendario } = require('../Administracion/controllers/Categorizaciones/esquemasController');

// Rutas de eventos
router.post('/', crearEvento);
router.get('/', obtenerEventos);

// Obtener departamentos
router.get('/departamentos', obtenerDepartamentosId);
// Obtener esquemas y categorias
router.get('/esquemas_categorias', obtenerEsquemasCategoriasCalendario);
module.exports = router;
