// Rutas de Facultades
const express = require('express');
const { obtenerFacultades, obtenerDepartamentosFacultad } = require('../controllers/facultadesController');
const router = express.Router();

// Obtener todas las facultades
router.get('/',obtenerFacultades);
router.get('/getdept/:id',obtenerDepartamentosFacultad);

module.exports = router;