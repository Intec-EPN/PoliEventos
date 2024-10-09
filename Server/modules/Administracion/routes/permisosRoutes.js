// Rutas de Permisos
const express = require('express');
const router = express.Router();
const { obtenerPermisosBase, obtenerPermisosAcciones } = require('../controllers/permisosController');

// Obtener permisos base
router.get('/get', obtenerPermisosAcciones); 
router.get('/getbase', obtenerPermisosBase); 

module.exports = router;

