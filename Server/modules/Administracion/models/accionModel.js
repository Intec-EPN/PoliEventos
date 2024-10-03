const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const Accion = sequelize.define('Accion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tooltip: {
        type: DataTypes.TEXT, 
        allowNull: true,
    },
    bgColor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'acciones',
    timestamps: false,
});

module.exports = Accion;
