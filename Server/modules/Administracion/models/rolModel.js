const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT, 
    },
}, {
    tableName: 'roles', 
    timestamps: false,
});

module.exports = Rol;
