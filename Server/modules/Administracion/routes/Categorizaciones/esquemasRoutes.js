// Rutas de esquemas
const express = require('express');
const { obtenerEsquemasCategorias, atualizarEsquemasCategorias, crearEsquemasCategorias } = require('../../controllers/Categorizaciones/esquemasController');
const router = express.Router();

// Obtener Esquemas y Categorías construidas:
router.get('/get', obtenerEsquemasCategorias);
router.post('/', crearEsquemasCategorias);
router.put('/:id', atualizarEsquemasCategorias);

module.exports = router;