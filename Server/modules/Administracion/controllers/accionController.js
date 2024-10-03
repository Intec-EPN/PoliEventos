const Accion = require("../models/accionModel");

exports.getAcciones = async (req, res) => {
    try {
        const acciones = await Accion.findAll();
        res.status(200).json(acciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
