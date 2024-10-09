// Rol_Departamentos
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

// Roles Modelo
const RolesModel = require('../rolesModel');
// Departamentos Model
const DepartamentosModel = require('../departamentosModel');

const RolDepartamentosModel = sequelize.define('Rol_Departamentos', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    rol_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    departamento_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    } 
}, {
    tableName: 'rol_departamentos',
    timestamps: false,
});

// Relaciones:
// Relación de rol_id con Roles
RolDepartamentosModel.belongsTo(RolesModel, {foreignKey: 'rol_id'});
// Relación de departamento_id con Departamentos
RolDepartamentosModel.belongsTo(DepartamentosModel, {foreignKey: 'departamento_id'});

module.exports = RolDepartamentosModel;