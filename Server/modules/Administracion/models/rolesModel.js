// Modelo Rol
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const RolesModel = sequelize.define('Roles',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName: 'roles', // Nombre de la tabla en mysql
    timestamps: false,  // Desactivo timestamps (createdAt y updatedAt) 
});

module.exports = RolesModel;