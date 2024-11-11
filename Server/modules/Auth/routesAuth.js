const express = require('express');
const router = express.Router();
const { crearUsuario } = require('./controllers/crearController');
const { loginUsuario } = require('./controllers/loginController');

// Rutas de autenticación
router.post('/create', crearUsuario);
router.post('/login', loginUsuario);
// router.post('/logout',);

module.exports = router;