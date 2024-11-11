// crearController.js
const { SanitizarValidar } = require("../middleware/validacionesUsuario");
const UsuariosModel = require("../models/usuariosModel");
const bcrypt = require('bcrypt');


const crearUsuario = [
    SanitizarValidar, // Satinizar y validar los campos.
    async (req, res) => {
        const { nombre, email, password } = req.body;

        try {
            // Hashear la contraseña con Bcrypt
            const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas para codificar.

            // Crear el usuario
            const usuario = await UsuariosModel.create({
                nombre: nombre,
                correo: email,
                password_hash: hashedPassword
            });
            //TODO QUITAR CUANDO YA NO SE NECESITE
            res.status(200).json({ message: 'Usuario creado exitosamente.', usuario: usuario });
        } catch (error) {
            console.error(`Error al crear el usuario: ${error}`);
            res.status(400).json({ error: error.message });
        }
    }
];
module.exports = { crearUsuario };