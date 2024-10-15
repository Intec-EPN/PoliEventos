// Rol_Permisos
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../../config/db');


// Roles Modelo
const RolesModel = require('../rolesModel');
// Permisos Modelo
const PermisosModel = require('../permisosModel');

const RolPermisosModel = sequelize.define('Rol_Permisos', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    rol_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    permiso_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    } 
}, {
    tableName: 'rol_permisos',
    timestamps: false,
});

// Relaciones:
// Relación de rol_id con Roles
RolPermisosModel.belongsTo(RolesModel, {foreignKey: 'rol_id'});
// Relación de rol_id con Permisos
RolPermisosModel.belongsTo(PermisosModel, {foreignKey: 'permiso_id'});

module.exports = RolPermisosModel;
