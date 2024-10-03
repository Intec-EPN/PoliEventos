const Permiso = require('../models/permisoModel');

exports.getPermisos = async (req, res) => {
    try {
        const permisos = await Permiso.findAll();
        res.json(permisos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los permisos.' });
    }
};

