// Rutas de esquemas
const express = require('express');
const { obtenerEsquemasCategorias } = require('../../controllers/Categorizaciones/esquemasController');
const router = express.Router();

// Obtener Esquemas y Categorías construidas:
router.get('/get', obtenerEsquemasCategorias);

module.exports = router;