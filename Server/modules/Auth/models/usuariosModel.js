// usuariosModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const UsuariosModel = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,  // Un correo debe ser único
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false, // Guardará el hash de la contraseña
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'usuarios',
    timestamps: false, // El timestamp ya lo hace la base  
    indexes: [
        {
            unique: true,
            fields: ['correo']
        }
    ]
});

module.exports = UsuariosModel;
