const express = require('express');
const router = express.Router();

// Rutas de roles
const rolesRoutes = require('./routes/rolesRoutes')
// Rutas de niveles
const nivelesRoutes = require('./routes/nivelesRoutes')
// Rutas de permisos
const permisosRoutes = require('./routes/permisosRoutes')
// Rutas de departamentos
const departamentosRoutes = require('./routes/departamentosRoutes')


// Usar las rutas de roles
router.use('/roles', rolesRoutes);
// Usar las rutas de niveles
router.use('/niveles', nivelesRoutes);
// Usar las rutas de permisos
router.use('/permisos', permisosRoutes);
// Usar las rutas de departamentos
router.use('/departamentos', departamentosRoutes);


module.exports = router;
