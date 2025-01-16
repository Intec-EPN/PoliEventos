require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosModel = require("../models/usuariosModel");
const { sequelize } = require("../../../config/db");
const { ValidarLogin } = require("../middleware/validacionesUsuario");
const RolPermisosModel = require("../../Administracion/models/Roles/tablas-intermedias/rol_permisosModel");
const PermisosModel = require("../../Administracion/models/Roles/permisosModel");

const jwtSecret = process.env.JWT_SECRET;

const loginUsuario = [
    ValidarLogin, // Validar y sanitizar los campos
    async (req, res) => {
        const { email, password } = req.body;
        try {
            // Buscar el usuario por correo electrónico
            const usuario = await UsuariosModel.findOne({ where: { correo: email } });
            if (!usuario) {
                return res.status(400).json({ error: 'Credenciales inválidas.' });
            }

            // Verificar si el usuario está habilitado
            if (!usuario.habilitado) {
                return res.status(400).json({ error: 'Usuario no habilitado.' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, usuario.password_hash);
            if (!isMatch) {
                return res.status(400).json({ error: 'Contraseña incorrecta.' });
            }

            const roles = await obtenerRolesPorUsuario(usuario.id);

            // Verificar si roles está vacío
            if (roles.length === 0) {
                return res.status(400).json({ error: 'El usuario no tiene roles asignados.' });
            }

            // Obtener el id del primer rol del usuario
            const rolId = roles[0].rol_id;

            // Obtener los permisos asociados al rol
            const permisos = await RolPermisosModel.findAll({
                where: { rol_id: rolId },
                include: [{ model: PermisosModel, as: 'Permiso' }]
            });

            // Determinar el nivel de acceso más alto
            let nivelAcceso = 'propio';
            permisos.forEach(permiso => {
                if (permiso) {
                    const permisoId = permiso.permiso_id; // Cambiado a permiso_id
                    if (permisoId >= 6) {
                        nivelAcceso = 'facultad';
                    } else if (permisoId >= 2 && permisoId <= 5) {
                        nivelAcceso = 'departamento';
                    }
                }
            });

            // Crear el token con el id del usuario, nombre, correo, roles y nivel de acceso
            const token = await jwt.sign({ id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, roles: roles, nivelAcceso: nivelAcceso }, jwtSecret, {
                expiresIn: '2h'
            });

            console.log("***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************", process.env.NODE_ENV)
            // Establecer la cookie con el token
            res.cookie('access_token', token, {
                httpOnly: true, // Sólo a través del servidor (No Javascript del cliente).
                secure: process.env.NODE_ENV === 'production', // Sólo por HTTPS en producción
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Protección contra CSRF (LAX cuando está en local).
                maxAge: 2 * 60 * 60 * 1000 // 2 horas en milisegundos
            });
           
            // Responder con éxito
            res.status(200).json({ message: 'Inicio de sesión exitoso.', id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, roles: roles, nivelAcceso: nivelAcceso });
        } catch (error) {
            console.error("Error en loginUsuario:", error);
            res.status(400).json({ error: 'Error del inicio de sesión.' });
        }
    }
];

const obtenerRolesPorUsuario = async (usuario_id) => {
    try {
        const results = await sequelize.query('CALL ObtenerRolesPorUsuarioId(:usuario_id)', {
            replacements: { usuario_id },
            type: sequelize.QueryTypes.SELECT
        });
        // Transformar el objeto en un array
        const rolesArray = Object.values(results[0]);
        return rolesArray || [];
    } catch (error) {
        console.error("Error en obtenerRolesPorUsuario:", error);
        throw error;
    }
};

module.exports = { loginUsuario, obtenerRolesPorUsuario };