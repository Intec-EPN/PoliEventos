const { ValidarLogin } = require("../middleware/validacionesUsuario");
const UsuariosModel = require("../models/usuariosModel");
const bcrypt = require('bcrypt');

const loginUsuario = [
    ValidarLogin, // Validar y sanitizar los campos

    async (req, res) => {
        const { email, password } = req.body;

        try {
            // Buscar el usuario por correo electrónico
            const usuario = await UsuariosModel.findOne({ where: { correo: email } });
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales inválidas.' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, usuario.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta.' });
            }

            // Responder con éxito
            res.status(200).json({ message: 'Inicio de sesión exitoso.'});
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
            res.status(401).json({ error: 'Error del inicio de sesión.' });
        }
    }
];

module.exports = { loginUsuario };