const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const Departamento = sequelize.define('Departamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'departamentos', 
    timestamps: false,
});

module.exports = Departamento;
