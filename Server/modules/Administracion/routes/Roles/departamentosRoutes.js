// Rutas de departamentos
const express = require('express');
const { obtenerDepartamentosRolId, obtenerDepartamentos } = require('../../controllers/Roles/departamentosController');
const router = express.Router();

// Obtener roles por id
router.get('/', obtenerDepartamentos);
// Obtener Departamento de Rol
router.get('/get/:id', obtenerDepartamentosRolId);

module.exports = router;