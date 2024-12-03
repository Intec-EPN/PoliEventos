const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

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

module.exports = EventosExpositoresModel;