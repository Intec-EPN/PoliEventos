const { obtenerRolesPorUsuario } = require("../../../Auth/controllers/loginController");
const UsuarioRolModel = require("../../../Auth/models/tablas-intermedias/usuario_rolesModel");
const UsuariosModel = require("../../../Auth/models/usuariosModel");
const RolesModel = require("../../models/Roles/rolesModel");
const EventosModel = require("../../../GestionEventos/models/eventoModel");

const obtenerUsuarios = async (req, res) => {
    try {
        const usuariosBruto = await UsuariosModel.findAll({
            attributes: ['id', 'nombre', 'correo', 'creado_en', 'habilitado']
        });
        const usuariosFiltadros = usuariosBruto.filter(user => user.nombre !== 'admn');

        const usuarios = [];
        for (const usuario of usuariosFiltadros) {
            const roles = await obtenerRolesPorUsuario(usuario.id);
            const eventos = await EventosModel.findOne({ where: { usuario_id: usuario.id } });
            usuarios.push({
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                fecha: usuario.creado_en,
                habilitado: usuario.habilitado,
                roles: roles,
                conEventos: eventos ? true : false,
            });
        }

        res.status(200).json(usuarios);
    } catch (error) {
        console.error(`Error al obtener los usuarios: ${error.message}`, error);
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

const eliminarUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    if (!usuarioId) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        // Verificar si el usuario existe
        const usuario = await UsuariosModel.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si el usuario tiene eventos asociados
        const eventos = await EventosModel.findOne({ where: { usuario_id: usuarioId } });
        if (eventos) {
            return res.status(400).json({ error: 'El usuario tiene eventos asociados y no puede ser eliminado' });
        }

        // Eliminar las asignaciones existentes del usuario
        await UsuarioRolModel.destroy({
            where: { usuario_id: usuarioId }
        });

        // Eliminar el usuario
        await UsuariosModel.destroy({
            where: { id: usuarioId }
        });

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}

module.exports = { obtenerUsuarios, asignarRolesUsuario, eliminarUsuario };