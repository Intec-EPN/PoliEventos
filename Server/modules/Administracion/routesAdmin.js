//TODO exportar las rutas
const express = require('express');
const router = express.Router();
const rolRoutes = require('./routes/rolRoutes');


// Usar las rutas de roles
router.use('/roles', rolRoutes);
// router.use('/otros', otrosRoutes);

module.exports = router;
