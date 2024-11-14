// Rutas de usuarios
const express = require('express');
const { obtenerUsuarios, asignarRolesUsuario } = require('../../controllers/Usuarios/usuariosController');
const router = express.Router();

router.get('/get', obtenerUsuarios);
router.post('/asignar', asignarRolesUsuario);

module.exports = router;