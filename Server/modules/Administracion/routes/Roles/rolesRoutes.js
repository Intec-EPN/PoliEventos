// Rutas de roles
const express = require('express');
const router = express.Router();
const { obtenerRolDescripcionId, obtenerRolesDescripcion, obtenerRoles, crearRol, eliminarRolPorNombre } = require('../../controllers/Roles/rolesController');
const { validarCrearRol } = require('../../middleware/rolesMiddleware');


// Obtener roles por id
router.get('/', obtenerRolesDescripcion);
router.get('/get/:id',obtenerRolDescripcionId);
// Rol construido
router.get('/array', obtenerRoles);
// Crear rol
router.post('/create', validarCrearRol, crearRol);
// Eliminar rol
router.delete('/:nombre', eliminarRolPorNombre);

module.exports = router;