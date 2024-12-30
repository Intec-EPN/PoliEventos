const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const EventosModel = require('../eventoModel');
const ExpositoresModel = require('../expositoresModel');


const EventosExpositoresModel = sequelize.define('eventos_expositores', {
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
    expositor_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'expositores',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'eventos_expositores',
    timestamps: false,
});

// Definir asociaciones
EventosExpositoresModel.belongsTo(EventosModel, { foreignKey: 'evento_id' });
EventosExpositoresModel.belongsTo(ExpositoresModel, { foreignKey: 'expositor_id' });

module.exports = EventosExpositoresModel;