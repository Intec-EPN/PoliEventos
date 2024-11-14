const { obtenerRolesPorUsuario } = require("../../../Auth/controllers/loginController");
const UsuarioRolModel = require("../../../Auth/models/tablas-intermedias/usuario_rolesModel");
const UsuariosModel = require("../../../Auth/models/usuariosModel");
const RolesModel = require("../../models/Roles/rolesModel");

const obtenerUsuarios = async (req, res) => {
    try {
        const usuariosBruto = await UsuariosModel.findAll({
            attributes: ['id', 'nombre', 'correo']
        });
        const usuariosFiltadros = usuariosBruto.filter(user => user.nombre !== 'admn');

        const usuarios = await Promise.all(usuariosFiltadros.map(async (usuario) => {
            const roles = await obtenerRolesPorUsuario(usuario.id);
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                roles: roles,
            };
        }));

        res.status(200).json(usuarios);
    } catch (error) {
        console.error(`Error al obtener los usuarios: ${error}`);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
}



const asignarRolesUsuario = async (req, res) => {
    const { usuarioId, rolesIds } = req.body;

    if (!usuarioId || !Array.isArray(rolesIds)) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        // Verificar si el usuario existe
        const usuario = await UsuariosModel.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si los roles existen
        const roles = await RolesModel.findAll({
            where: {
                id: rolesIds
            }
        });

        if (roles.length !== rolesIds.length) {
            return res.status(404).json({ error: 'Uno o más roles no encontrados' });
        }

        // Eliminar las asignaciones existentes del usuario
        await UsuarioRolModel.destroy({
            where: { usuario_id: usuarioId }
        });

        // Crear nuevas asignaciones
        const asignaciones = rolesIds.map(rolId => ({
            usuario_id: usuarioId,
            rol_id: rolId
        }));

        await UsuarioRolModel.bulkCreate(asignaciones);

        res.status(200).json({ message: 'Roles asignados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar roles' });
    }
};


module.exports = { obtenerUsuarios, asignarRolesUsuario };