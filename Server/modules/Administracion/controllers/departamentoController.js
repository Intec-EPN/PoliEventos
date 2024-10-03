const Departamento = require('../models/departamentoModel');

exports.getDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los departamentos.' });
    }
};

