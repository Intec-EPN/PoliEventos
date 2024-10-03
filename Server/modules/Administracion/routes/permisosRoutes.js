const express = require('express');
const { getPermisos } = require('../controllers/permisoController');

const router = express.Router();

router.get('/', getPermisos);

module.exports = router;
