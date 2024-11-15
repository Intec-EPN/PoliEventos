const UsuariosModel = require("../../../Auth/models/usuariosModel");

const cambiarHabilitacionUsuario = async (req, res) => {
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

        // Cambiar la habilitación del usuario
        usuario.habilitado = !usuario.habilitado;
        await usuario.save();

        res.status(200).json({ message: 'Habilitación cambiada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cambiar habilitación' });
    }
};

module.exports = { cambiarHabilitacionUsuario };