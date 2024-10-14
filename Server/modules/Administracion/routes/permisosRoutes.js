// Rutas de Permisos
const express = require('express');
const router = express.Router();
const { obtenerPermisosBase, obtenerPermisosAcciones, obtenerEstructura } = require('../controllers/permisosController');

// Obtener permisos base
router.get('/get', obtenerPermisosAcciones); 
router.get('/getbase', obtenerPermisosBase); 
router.get('/estructura', obtenerEstructura); 

module.exports = router;

