const express = require('express');
const router = express.Router();
const routesAdmin = require('./Administracion/routesAdmin');
const routesAuth = require('./Auth/routesAuth');
const routesGestion = require('./GestionEventos/routesGestion');
const authMiddleware = require('./Auth/middleware/authMiddleware');
const adminMiddleware = require('./Auth/middleware/adminMiddleware');

// Usar las rutas de administración con middleware de autenticación y administración
router.use('/admin', authMiddleware, adminMiddleware, routesAdmin);
// Usar las rutas de autenticación
router.use('/auth', routesAuth);
// Usar las rutas de gestión de eventos
router.use('/gestion', routesGestion);

module.exports = router;
