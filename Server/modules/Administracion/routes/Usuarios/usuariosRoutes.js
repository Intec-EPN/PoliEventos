// Rutas de usuarios
const express = require('express');
const { obtenerUsuarios, asignarRolesUsuario, eliminarUsuario } = require('../../controllers/Usuarios/usuariosController');
const router = express.Router();

router.get('/get', obtenerUsuarios);
router.post('/asignar', asignarRolesUsuario);
router.delete('/:usuarioId', eliminarUsuario);
module.exports = router;