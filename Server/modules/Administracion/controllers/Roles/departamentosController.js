const { sequelize } = require("../../../../config/db");
const DepartamentosModel = require("../../models/Roles/departamentosModel");

// API REST
// Tabla Roles
const obtenerDepartamentos = async (req, res) => {
    try {
        // findAll para obtener todos
        const departamentos = await DepartamentosModel.findAll({
            attributes: [['nombre', 'departamento']]
        });
        if (departamentos) {
            res.status(200).json(departamentos);
        } else {
            res.status(500).json({ error: 'No existen departamentos.' });
        }
    } catch (error) {
        console.error(`Error al obtener los departamentos: ${error}`);
        res.status(500).json({ error: 'Error al obtener los departamentos.' });
    }
};

const obtenerDepartamentosId = async (req, res) => {
    try {
        // findAll para obtener todos
        const departamentos = await DepartamentosModel.findAll({
            attributes: ['id', ['nombre', 'departamento']]
        });
        if (departamentos) {
            res.status(200).json(departamentos);
        } else {
            res.status(500).json({ error: 'No existen departamentos.' });
        }
    } catch (error) {
        console.error(`Error al obtener los departamentos: ${error}`);
        res.status(500).json({ error: 'Error al obtener los departamentos.' });
    }
};

// TABLA INTERMEDIA
const obtenerDepartamentosRolId = async (req, res) => {
    const rolId = req.params.id;
    try {
        const [departamentos] = await sequelize.query('CALL Get_Departamentos_Rol_Id(:rolId)', {
            replacements: { rolId: rolId }, // Sustitución de parámetros para prevenir SQL Injection
        });
        res.status(200).json(departamentos);
    } catch (error) {
        console.error(`Error al obtener departamentos para el rol ${rolId}: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener departamentos para el rol especificado.' });
    }
};

// Métodos no API Rest (para funcionamiento del controlador)
const obtenerDepartamentosArray = async (rolId) => {
    try {
        const departamentos = await sequelize.query('CALL Get_Departamentos_Rol_Id(:rolId)', {
            replacements: { rolId: rolId }, // Sustitución de parámetros para prevenir SQL Injection
        });
        return departamentos;
    } catch (error) {
        console.error(`Error al obtener los departamentos: ${error}`);
        throw new Error('Error al obtener los departamentos.');
    }
};

// Función para obtener el ID del departamento
const obtenerDepartamentoId = async (departamentoCodigo) => {
    const departamento = await DepartamentosModel.findOne({
        where: { nombre: departamentoCodigo }
    });
    return departamento ? departamento.id : null;
};

module.exports = { obtenerDepartamentosRolId, obtenerDepartamentosId, obtenerDepartamentos, obtenerDepartamentosArray, obtenerDepartamentoId };