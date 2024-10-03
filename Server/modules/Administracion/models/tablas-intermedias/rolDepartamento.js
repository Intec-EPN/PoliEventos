const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

const RolDepartamento = sequelize.define('RolDepartamento', {
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'roles', 
            key: 'id',
        },
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'departamentos', 
            key: 'id',
        },
    },
}, {
    tableName: 'rol_departamento', 
    timestamps: false,
});

module.exports = RolDepartamento;
