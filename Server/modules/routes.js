
const express = require('express');
const router = express.Router();
const routesAdmin = require('./Administracion/routesAdmin');
const routesAuth = require('./Auth/routesAuth');

// Usar las rutas de administración
router.use('/admin', routesAdmin);
// Usar las rutas de autenticación
router.use('/auth', routesAuth);

module.exports = router;
