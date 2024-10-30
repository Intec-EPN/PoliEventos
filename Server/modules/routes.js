
const express = require('express');
const router = express.Router();
const routesAdmin = require('./Administracion/routesAdmin');

// Usar las rutas de administración
router.use('/admin', routesAdmin);


module.exports = router;
