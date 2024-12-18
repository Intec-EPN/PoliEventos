const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const EventosModel = sequelize.define('Eventos', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lugar: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    asistentes: {
        type: DataTypes.INTEGER,
    },
    usuario_id: {
        type: DataTypes.CHAR(36),
        references: {
            model: 'usuarios',
            key: 'id',
        },
    },
    enlaces: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'eventos',
    timestamps: false,
});

module.exports = EventosModel;