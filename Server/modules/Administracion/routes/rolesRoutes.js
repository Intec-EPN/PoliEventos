// Rutas de roles
const express = require('express');
const router = express.Router();
const { obtenerRolDescripcionId, obtenerRolesDescripcion, obtenerRoles } = require('../controllers/rolesController');


// Obtener roles por id
router.get('/', obtenerRolesDescripcion);
router.get('/get/:id',obtenerRolDescripcionId);
// Rol construido
router.get('/array', obtenerRoles);

module.exports = router;