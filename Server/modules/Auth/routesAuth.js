const express = require('express');
const router = express.Router();
const { crearUsuario } = require('./controllers/crearController');
const { loginUsuario } = require('./controllers/loginController');
const { logoutUsuario } = require('./controllers/logoutController');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');

// Rutas de autenticación
router.post('/create', crearUsuario);
router.post('/login', loginUsuario);
router.post('/logout', authMiddleware, logoutUsuario);

module.exports = router;