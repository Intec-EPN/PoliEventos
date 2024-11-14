const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosModel = require("../models/usuariosModel");
const { sequelize } = require("../../../config/db");
const { ValidarLogin } = require("../middleware/validacionesUsuario");

const jwtSecret = process.env.JWT_SECRET;

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

            // Obtener los roles del usuario utilizando el procedimiento almacenado
            const roles = await obtenerRolesPorUsuario(usuario.id);

            // Crear el token con el id del usuario, nombre, correo y sus roles
            const token = await jwt.sign({ id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, roles: roles }, jwtSecret, {
                expiresIn: '2h'
            });

            // Establecer la cookie con el token
            res.cookie('access_token', token, {
                httpOnly: true, // Sólo a través del servidor (No Javascript del cliente).
                secure: process.env.NODE_ENV === 'production', // Sólo por HTTPS en producción
                sameSite: 'lax', // Protección contra CSRF
                maxAge: 2 * 60 * 60 * 1000 // 2 horas en milisegundos
            });
            //TODO QUITAR CUANDO YA NO SE NECESITE
            // Responder con éxito
            res.status(200).json({ message: 'Inicio de sesión exitoso.', id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, roles: roles });
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
            res.status(401).json({ error: 'Error del inicio de sesión.' });
        }
    }
];


const obtenerRolesPorUsuario = async (usuario_id) => {
    const results = await sequelize.query('CALL ObtenerRolesPorUsuarioId(:usuario_id)', {
        replacements: { usuario_id },
        type: sequelize.QueryTypes.SELECT
    });
    // Transformar el objeto en un array
    const rolesArray = Object.values(results[0]);
    return rolesArray || [];
};

module.exports = { loginUsuario, obtenerRolesPorUsuario };