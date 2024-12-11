const express = require('express');
const router = express.Router();

const { crearEvento, obtenerEventos, eliminarEvento, editarEvento } = require('./controllers/eventosController');
const { obtenerDepartamentosId } = require('../Administracion/controllers/Roles/departamentosController');
const { obtenerEsquemasCategoriasCalendario } = require('../Administracion/controllers/Categorizaciones/esquemasController');
const { obtenerPermisosPorRol } = require('../Administracion/controllers/Roles/permisosController');

// Rutas de eventos
router.post('/', crearEvento);
router.get('/', obtenerEventos);
router.delete('/:id', eliminarEvento);
router.put('/:id', editarEvento);

// Obtener departamentos
router.get('/departamentos', obtenerDepartamentosId);
// Obtener esquemas y categorias
router.get('/esquemas_categorias', obtenerEsquemasCategoriasCalendario);
// Obtener permisos
router.get('/permisos/:rolId', obtenerPermisosPorRol);

module.exports = router;
