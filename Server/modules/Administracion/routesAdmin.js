const express = require('express');
const router = express.Router();

// Rutas de roles
const rolesRoutes = require('./routes/Roles/rolesRoutes');
// Rutas de niveles
const nivelesRoutes = require('./routes/Roles/nivelesRoutes');
// Rutas de permisos
const permisosRoutes = require('./routes/Roles/permisosRoutes');
// Rutas de departamentos
const departamentosRoutes = require('./routes/Roles/departamentosRoutes');
// Rutas de facultades
const facultadesRoutes = require('./routes/Roles/facultadesRoutes');

// Rutas de esquemas
const esquemasRoutes = require('./routes/Categorizaciones/esquemasRoutes');

// Rutas de usuarios
const usuariosRoutes = require('./routes/Usuarios/usuariosRoutes');

// ROLES Y PERMISOS
// Usar las rutas de roles
router.use('/roles', rolesRoutes);
// Usar las rutas de niveles
router.use('/niveles', nivelesRoutes);
// Usar las rutas de permisos
router.use('/permisos', permisosRoutes);
// Usar las rutas de departamentos
router.use('/departamentos', departamentosRoutes);
// Usar las rutas de facultades
router.use('/facultades', facultadesRoutes);

// ESQUEMAS CATEGORIZACION Y CATEGORIAS
router.use('/esquemas', esquemasRoutes);

// USUARIOS
router.use('/usuarios', usuariosRoutes);

module.exports = router;
