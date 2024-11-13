const express = require('express');
const router = express.Router();
const routesAdmin = require('./Administracion/routesAdmin');
const routesAuth = require('./Auth/routesAuth');
const authMiddleware = require('./Auth/middleware/authMiddleware');
const adminMiddleware = require('./Auth/middleware/adminMiddleware');

// Usar las rutas de administración con middleware de autenticación y administración
router.use('/admin', authMiddleware, adminMiddleware, routesAdmin);
// Usar las rutas de autenticación
router.use('/auth', routesAuth);

module.exports = router;
