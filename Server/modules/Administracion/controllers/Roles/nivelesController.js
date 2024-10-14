const { sequelize } = require("../../../../config/db");
const NivelesModel = require("../../models/Roles/nivelesModel");

// Obtener niveles base
const obtenerNivelesBase = async(req, res) => {
    try {
        const result = await sequelize.query('call ObtenerNiveles();');        
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener niveles: ${error}`);
        res.status(500).json({error: 'Error al obtener niveles.'});
    }
};

// Métodos no API Rest (para funcionamiento del controlador)
const obtenerNivelesArray = async () => {
    try {
        const niveles = await NivelesModel.findAll({
            attributes: ['id', 'nombre', 'color', 'icono']
        });
        return niveles;
    } catch (error) {
        console.error(`Error al obtener los niveles: ${error}`);
        throw new Error('Error al obtener los niveles.');
    }
}
module.exports = {obtenerNivelesBase, obtenerNivelesArray};