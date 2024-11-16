// validacionesUsuario.js
const { body, validationResult } = require('express-validator');
const UsuariosModel = require("../models/usuariosModel");

const SanitizarValidar = [
    // Sanitización
    body('nombre').trim().escape().matches(/^[a-zA-ZÀ-ÿ\s]+$/).withMessage('El nombre ingresado no es válido.'),
    body('email').normalizeEmail().trim().isEmail().withMessage('El correo electrónico no es válido.'),
    body('password')
        .trim()
        .escape()
        .matches(/^[a-zA-Z0-9!@#$%^&*áéíóúÁÉÍÓÚñÑ\_]+$/)
        .withMessage('La contraseña contiene caracteres no permitidos.'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            return res.status(400).json({ error: firstError });
        }

        const { nombre, email, password } = req.body;

        // Validaciones personalizadas
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }
        if (typeof nombre !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ error: 'Los campos deben ser de tipo texto.' });
        }
        const existe = await UsuariosModel.findOne({ where: { correo: email } });
        if (existe) {
            return res.status(400).json({ error: 'El usuario ya existe.' });
        }
        if (nombre.length < 3) {
            return res.status(400).json({ error: 'El nombre debe tener al menos 3 caracteres.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        next();
    }
];

const SanitizarValidarEdicion = [
    // Sanitización
    body('nombre').optional().trim().escape().matches(/^[a-zA-ZÀ-ÿ\s]+$/).withMessage('El nombre ingresado no es válido.'),
    body('correo').optional().normalizeEmail().trim().isEmail().withMessage('El correo electrónico no es válido.'),
    body('password').optional().trim().escape().matches(/^[a-zA-Z0-9!@#$%^&*áéíóúÁÉÍÓÚñÑ\_]+$/).withMessage('La contraseña contiene caracteres no permitidos.'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            return res.status(400).json({ error: firstError });
        }

        const { nombre, correo, password } = req.body;

        // Validaciones personalizadas
        if (nombre && (typeof nombre !== 'string' || nombre.length < 3)) {
            return res.status(400).json({ error: 'El nombre debe tener al menos 3 caracteres y ser de tipo texto.' });
        }
        if (correo && typeof correo !== 'string') {
            return res.status(400).json({ error: 'El correo debe ser de tipo texto.' });
        }
        if (password && (typeof password !== 'string' || password.length < 6)) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres y ser de tipo texto.' });
        }

        next();
    }
];

const ValidarLogin = [
    body('email').normalizeEmail().trim().isEmail().withMessage('El correo electrónico no es válido.'),
    body('password').trim().escape().notEmpty().withMessage('La contraseña es obligatoria.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            return res.status(400).json({ error: firstError });
        }
        next();
    }
];

module.exports = {
    SanitizarValidar,
    SanitizarValidarEdicion,
    ValidarLogin
};