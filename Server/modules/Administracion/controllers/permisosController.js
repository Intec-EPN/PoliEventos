const { sequelize } = require("../../../config/db");

const obtenerPermisosBase = async (req, res) => {
    try {
        const result = await sequelize.query('call ObtenerPermisos();');
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error al obtener permisos: ${error}`);
        res.status(500).json({ error: 'Error al obtener permisos.' });
    }
};

const obtenerPermisosAcciones = async (req, res) => {
    try {
        // Obtengo todos los niveles:
        const niveles = await sequelize.query('call ObtenerNiveles();');
        // Obtengo todos los permisos:
        const permisos = await sequelize.query('call ObtenerPermisos();');

        const permisosEstructurados = niveles.map(nivel => {
            const permisoPorNivel = permisos.filter(permiso => permiso.nivel_id === nivel.id);

            return {
                nombre: nivel.nombre,
                color: nivel.color,
                acciones: permisoPorNivel.map(permiso => permiso.id) //obtengo solo los ids
            }
        });
        res.status(200).json(permisosEstructurados);
    } catch (error) {
        console.error(`Error al obtener permisos estructurados: ${error}`);
        res.status(500).json({ error: 'Error al obtener permisos estructurados.' });
    }
};


// Métodos no API Rest (para funcionamiento del controlador)
// Obtener permisos correspondientes a un rol, tengo incluidos los id de los niveles a los que eprtenecen.
const obtenerPermisosRol = async (permisoId) => {
    try {
        const acciones = await sequelize.query('CALL Get_Permisos_Rol_Id(:permisoId)', {
            replacements: { permisoId: permisoId },
        });
        return acciones;
    } catch (error) {
        console.error(`Error al obtener permisos ${permisoId}: ${error}`);
        throw new Error('Error al obtener los permisos.');
    }
};



module.exports = { obtenerPermisosBase, obtenerPermisosAcciones, obtenerPermisosRol };