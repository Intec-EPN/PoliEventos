// modules/administracion/routes/rolRoutes.js

const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Definimos las rutas para los roles
router.get('/', rolController.getRoles); // Obtener todos los roles

// TODO RESTO RUTAS

module.exports = router;
