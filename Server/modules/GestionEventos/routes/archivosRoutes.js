const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController');

// ...existing code...

router.get('/descargar/:nombreArchivo', archivosController.descargarArchivo);

// ...existing code...

module.exports = router;
