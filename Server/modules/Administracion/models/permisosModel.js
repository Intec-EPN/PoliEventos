// Modelo Permisos
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

// Niveles Modelo
const NivelesModel = require('./nivelesModel');

const PermisosModel = sequelize.define('Permisos',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    accion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tooltip: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    bgColor: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    nivel_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    }
}, {
    tableName: 'permisos',
    timestamps: false,
});

// Relación de nivel_id con Niveles.
PermisosModel.belongsTo(NivelesModel, {foreignKey: 'nivel_id'});

module.exports = PermisosModel;

