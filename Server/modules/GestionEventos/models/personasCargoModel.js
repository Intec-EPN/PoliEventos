const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const PersonasCargoModel = sequelize.define('personas_cargo', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(255),
    },
    expositor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'personas_cargo',
    timestamps: false,
});

module.exports = PersonasCargoModel;