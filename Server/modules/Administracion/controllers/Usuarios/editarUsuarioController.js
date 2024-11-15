const { SanitizarValidarEdicion } = require("../../../Auth/middleware/validacionesUsuario");
const UsuariosModel = require("../../../Auth/models/usuariosModel");
const bcrypt = require('bcrypt');

const editarUsuario = [
    SanitizarValidarEdicion, 
    async (req, res) => {
        const { usuarioId } = req.params;
        const { nombre, correo, password } = req.body;

        if (!usuarioId) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        try {
            const usuario = await UsuariosModel.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const updatedData = {};
            if (nombre && nombre !== usuario.nombre) updatedData.nombre = nombre;
            if (correo && correo !== usuario.correo) updatedData.correo = correo;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedData.password_hash = hashedPassword;
            }

            if (Object.keys(updatedData).length === 0) {
                return res.status(200).json({ message: 'No hay cambios.' });
            }

            await usuario.update(updatedData);

            res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

module.exports = { editarUsuario };