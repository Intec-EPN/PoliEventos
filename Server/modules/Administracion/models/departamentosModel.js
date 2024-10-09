// Modelo Departamento
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const DepartamentosModel = sequelize.define('Departamentos',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},{
    tableName: 'departamentos',
    timestamps: false,
});

module.exports = DepartamentosModel;