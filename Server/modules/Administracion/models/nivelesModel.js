// Modelo Niveles
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const NivelesModel = sequelize.define('Niveles',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
},{
    tableName: 'niveles',
    timestamps: false,
});


module.exports = NivelesModel;