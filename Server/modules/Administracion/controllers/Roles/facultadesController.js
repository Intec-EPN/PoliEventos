const { sequelize } = require("../../../../config/db");
const FacultadesModel = require("../../models/Roles/facultadesModel");

// Obtener el nombre y el id de la facultad:
const obtenerFacultades = async (req, res) => {
    try {
        const facultades = await FacultadesModel.findAll({
            attributes: ['id', 'nombre']
        });
        if (facultades) {
            res.status(200).json(facultades);
        } else {
            res.status(500).json({ error: 'No existen facultades.' });
        }
    } catch (error) {
        console.error(`Error al obtener las facultades: ${error}`);
        res.status(500).json({ error: 'Error al obtener las facultades.' });
    }
};

// Obtener los departamentos dependiendo el id de la facultad.
const obtenerDepartamentosFacultadId = async (req, res) => {
    const facultadId = req.params.id;
    try {
        // Obtengo los departamentos de la facultad con el id que ingresa.
        const departamentos = await sequelize.query('call Get_Departamentos_Facultad_Id(:facultadId);', {
            replacements: { facultadId: facultadId }, // Sustitución para prevención de inyección SQL
        });

        // Formatear los datos para agregar la clave "departamento"
        const departamentosFacultad = departamentos.map(dep => ({
            departamento: dep.nombre // Agregar la clave "departamento"
        }));

        res.status(200).json(departamentosFacultad);
    } catch (error) {
        console.error(`Error al obtener departamentos para los departamentos de la facultad: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener departamentos para los departamentos de la facultad.' });
    }
};

// Función interna para obtener departamentos de una facultad por su ID
const obtenerDeptFacultadId = async (facultadId) => {
    try {
        const departamentos = await sequelize.query('call Get_Departamentos_Facultad_Id(:facultadId);', {
            replacements: { facultadId: facultadId },
        });
        // Retornar los departamentos en un formato adecuado
        return departamentos.map(dep => ({
            departamento: dep.nombre
        }));
    } catch (error) {
        console.error(`Error al obtener departamentos para la facultad ${facultadId}: ${error.message}`);
        return [];
    }
};


module.exports = { obtenerFacultades, obtenerDepartamentosFacultadId, obtenerDeptFacultadId };