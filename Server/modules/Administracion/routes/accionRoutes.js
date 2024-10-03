const express = require('express');
const { createAccion, getAcciones } = require('../controllers/accionController');

const router = express.Router();

router.get('/', getAcciones); 

module.exports = router;
