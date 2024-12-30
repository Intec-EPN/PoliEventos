const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const EventosModel = require('../eventoModel');
const DepartamentosModel = require('../../../Administracion/models/Roles/departamentosModel');

const EventosDepartamentosModel = sequelize.define('eventos_departamentos', {
    evento_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'eventos',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    departamento_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'departamentos',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'eventos_departamentos',
    timestamps: false,
});

// Definir asociaciones
EventosDepartamentosModel.belongsTo(EventosModel, { foreignKey: 'evento_id' });
EventosDepartamentosModel.belongsTo(DepartamentosModel, { foreignKey: 'departamento_id' });

module.exports = EventosDepartamentosModel;