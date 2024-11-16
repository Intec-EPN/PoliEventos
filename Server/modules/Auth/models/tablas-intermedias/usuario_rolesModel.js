// usuarioRolModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');


// Importar los modelos de Usuarios y Roles

const RolesModel = require('../../../Administracion/models/Roles/rolesModel');
const UsuariosModel = require('../usuariosModel');

const UsuarioRolModel = sequelize.define('Usuario_Rol', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    rol_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    }
}, {
    tableName: 'usuario_rol',
    timestamps: false,
});

// Definir relaciones
UsuarioRolModel.belongsTo(UsuariosModel, { foreignKey: 'usuario_id' });
UsuarioRolModel.belongsTo(RolesModel, { foreignKey: 'rol_id' });


UsuariosModel.belongsToMany(RolesModel, {
    through: UsuarioRolModel,
    foreignKey: 'usuario_id',
    otherKey: 'rol_id'
});
RolesModel.belongsToMany(UsuariosModel, {
    through: UsuarioRolModel,
    foreignKey: 'rol_id',
    otherKey: 'usuario_id'
});

module.exports = UsuarioRolModel;
