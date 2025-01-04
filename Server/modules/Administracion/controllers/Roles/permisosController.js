const { sequelize } = require("../../../../config/db");
const PermisosModel = require("../../models/Roles/permisosModel");
const RolPermisosModel = require("../../models/Roles/tablas-intermedias/rol_permisosModel");


const obtenerPermisosBase = async (req, res) => {
    try {
        const result = await sequelize.query('call ObtenerPermisos();');
        res.status(200).json(result);
    } catch (error) {
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
                icono: nivel.icono,
                acciones: permisoPorNivel.map(permiso => permiso.id) //obtengo solo los ids
            }
        });
        res.status(200).json(permisosEstructurados);
    } catch (error) {
        console.error(`Error al obtener permisos estructurados: ${error}`);
        res.status(500).json({ error: 'Error al obtener permisos estructurados.' });
    }
};

// Obtener Estructura
const obtenerEstructura = async (req, res) => {
    try {
        // Obtengo todos los niveles:
        const niveles = await sequelize.query('call ObtenerNiveles();');
       
        const permisosEstructurados = niveles.map(nivel => {
            return {
                nombre: nivel.nombre,
                color: nivel.color,
                icono: nivel.icono,
                acciones: []
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

const obtenerPermisosPorRol = async (req, res) => {
    const { rolId } = req.params;
    try {
        const permisos = await RolPermisosModel.findAll({
            where: { rol_id: rolId },
            include: [{ model: PermisosModel }]
        });

        const permisosFiltrados = permisos.map(permiso => ({
            permiso_id: permiso.permiso_id,
            accion: permiso.Permiso.accion,
            nivel_id: permiso.Permiso.nivel_id
        }));

        res.status(200).json(permisosFiltrados);
    } catch (error) {
        console.error(`Error al obtener permisos por rol ${rolId}: ${error}`);
        res.status(500).json({ error: 'Error al obtener permisos por rol.' });
    }
};

module.exports = { 
    obtenerPermisosBase, 
    obtenerPermisosAcciones, 
    obtenerEstructura, 
    obtenerPermisosRol,
    obtenerPermisosPorRol 
};