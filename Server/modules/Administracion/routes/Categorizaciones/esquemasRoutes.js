// Rutas de esquemas
const express = require('express');
const { obtenerEsquemasCategorias, atualizarEsquemasCategorias } = require('../../controllers/Categorizaciones/esquemasController');
const router = express.Router();

// Obtener Esquemas y Categorías construidas:
router.get('/get', obtenerEsquemasCategorias);
router.put('/:id', atualizarEsquemasCategorias);

module.exports = router;