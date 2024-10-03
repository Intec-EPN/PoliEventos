const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

const PermisoAccion = sequelize.define('PermisoAccion', {
    permiso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'permisos', // Usa el nombre de la tabla en minúsculas
            key: 'id',
        },
    },
    accion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'acciones', // Usa el nombre de la tabla en minúsculas
            key: 'id',
        },
    },
}, {
    tableName: 'permiso_acciones', // Especifica el nombre de la tabla
    timestamps: false,
});

module.exports = PermisoAccion;
