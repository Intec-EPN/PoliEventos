const { body } = require('express-validator');

const validarCrearRol = [
    body('rol')
        .notEmpty().withMessage('El nombre del rol es obligatorio.')
        .isLength({ max: 50 }).withMessage('El nombre del rol no puede exceder los 50 caracteres.'),
    body('descripcion')
        .optional()
        .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres.'),
    body('departamentos')
        .isArray().withMessage('Departamentos debe ser un arreglo.')
        .optional(),
    body('permisos')
        .isArray().withMessage('Permisos debe ser un arreglo.')
        .optional(),
    body('facultad_id')
        .isInt().withMessage('El ID de la facultad debe ser un número entero.'),
];

module.exports = { validarCrearRol };
