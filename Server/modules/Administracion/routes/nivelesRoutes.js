// Rutas de Niveles
const express = require('express');
const router = express.Router();
const { obtenerNivelesBase } = require('../controllers/nivelesController');

// Obtener niveles base
router.get('/getbase', obtenerNivelesBase); 

module.exports = router;