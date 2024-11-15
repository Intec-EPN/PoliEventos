// Rutas de usuarios
const express = require('express');
const { obtenerUsuarios, asignarRolesUsuario, eliminarUsuario } = require('../../controllers/Usuarios/usuariosController');
const { cambiarHabilitacionUsuario } = require('../../controllers/Usuarios/habilitacionController');
const { editarUsuario } = require('../../controllers/Usuarios/editarUsuarioController');
const router = express.Router();

router.get('/get', obtenerUsuarios);
router.post('/asignar', asignarRolesUsuario);
router.delete('/:usuarioId', eliminarUsuario);
router.patch('/:usuarioId', editarUsuario);
router.patch('/habilitar/:usuarioId', cambiarHabilitacionUsuario);
module.exports = router;