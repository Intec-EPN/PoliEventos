// Rutas de esquemas
const express = require('express');
const { obtenerEsquemasCategorias, atualizarEsquemasCategorias, crearEsquemasCategorias, cambiarVisibilidadEsquema, cambiarVisibilidadCategoria, eliminarEsquemaCategorias } = require('../../controllers/Categorizaciones/esquemasController');
const router = express.Router();

// Obtener Esquemas y Categorías construidas:
router.get('/get', obtenerEsquemasCategorias);
router.post('/', crearEsquemasCategorias);
router.put('/:id', atualizarEsquemasCategorias);
router.put('/visibilidad/:id', cambiarVisibilidadEsquema);
router.put('/categoria/visibilidad/:id', cambiarVisibilidadCategoria);
router.delete('/:id',eliminarEsquemaCategorias);
router.delete('/categoria/:id',eliminarCategoria);

module.exports = router;