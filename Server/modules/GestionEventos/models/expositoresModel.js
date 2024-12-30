const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');


const ExpositoresModel = sequelize.define('expositores', {
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
}, {
    tableName: 'expositores',
    timestamps: false,
});

module.exports = ExpositoresModel;