const express = require('express');
const { getDepartamentos } = require('../controllers/departamentoController');

const router = express.Router();

router.get('/', getDepartamentos);

module.exports = router;
