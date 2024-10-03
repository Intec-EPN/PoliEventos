const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const Permiso = sequelize.define('Permiso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'permisos', 
    timestamps: false,
});

module.exports = Permiso;
