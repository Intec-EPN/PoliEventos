// Rutas de departamentos
const express = require('express');
const router = express.Router();
const { obtenerDepartamentosRolId, obtenerDepartamentos } = require('../controllers/departamentosController');

// Obtener roles por id
router.get('/', obtenerDepartamentos);
router.get('/get/:id', obtenerDepartamentosRolId);

module.exports = router;